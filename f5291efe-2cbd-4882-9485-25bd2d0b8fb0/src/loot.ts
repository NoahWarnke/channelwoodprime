//import utils from "../node_modules/decentraland-ecs-utils/index"
import { getUserData, UserData } from '@decentraland/Identity'
import { Props, uiSystem } from './item'

type RewardStatus =
  | 'error'
  | 'campaign_not_started'
  | 'campaign_disabled'
  | 'campaign_finished'
  | 'unauthorized_address'
  | 'without_stock'
  | 'transaction_ready'
  | 'transaction_pending'
  | 'transaction_dropped'
  | 'transaction_failed'
  | 'transaction_success'

/////// CONNECTION SETUP

const apiUrl = 'https://gav.decentraland.org/api'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const idNum = Math.floor(Math.random() * 500)
let id: UserData = {
  userId: idNum.toString(),
  displayName: 'fail',
  publicKey: idNum.toString()
}

export function getUser() {
  executeTask(async () => {
    try {
      id = await getUserData()
      //   if (id) {
      //     log('ID: ', id.userId)
      //   }
    } catch {
      log('failed to reach user ID')
      id = {
        userId: idNum.toString(),
        displayName: 'fail',
        publicKey: idNum.toString()
      }
      uiSystem.setMessage(
        "Are you logged on to your Ethereum wallet? Something isn't working. If so, please reload",
        3
      )
    }
  })
}

getUser()

/////// PICK UP

export function sendNFT(props: Props, channel: IChannel) {
  let url = `${apiUrl}/rewards/${props.campaignId}/${props.collectPointId}`.toString()
  log(url)

  executeTask(async () => {
    try {
      getUser()
      const { AirdropController } = await this.loadAPIs(['AirdropController'])

      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: id.publicKey
        }
      })
      const body = (await response.json()) as {
        id: string // uuid
        status: RewardStatus
        transaction: string | null // string when status === 'ready' | 'failed'
        targetContract: string | null // string when status === 'ready' | 'failed'
        message: string | null // string when status !=== 'transaction_ready'
        rewards: [] | null //  [{ token: 'MANA', amount: 100 }, etc]
      }
      log('got response from API ')
      log(body)

      switch (body.status) {
        case 'transaction_ready': {
          log('Your rewards are ready to claim')
          AirdropController.openCrate(
            {
              title: 'You found a Loot Crate',
              subtitle: 'Your rewards are ready to be claimed!',
              items: body.rewards
            },
            body.transaction,
            body.targetContract
          )
        }
        case 'transaction_failed': {
          uiSystem.setMessage(body.message, 3)
          log("Your rewards couldn't be sent. try again")
          AirdropController.openCrate(
            {
              title: 'Claim your rewards!',
              subtitle:
                "It looks like the transaction didn't go through. Maybe try again?",
              fastForward: true,
              items: body.rewards
            },
            body.transaction,
            body.targetContract
          )
        }
        case 'campaign_not_started':
          uiSystem.setMessage(body.message, 3)
          return log('Is too early to get your rewards')

        case 'campaign_disabled':
          uiSystem.setMessage(body.message, 3)
          return log(
            "Campaign has begun but is disabled for now. We'll come back soon"
          )

        case 'campaign_finished':
          uiSystem.setMessage(body.message, 3)
          return log('Is too late to get your rewards')

        case 'unauthorized_address':
          uiSystem.setMessage(body.message, 3)
          return log('Are you a robot? If not, try again later')

        case 'without_stock':
          uiSystem.setMessage(body.message, 3)
          return log('Sorry! We ran out of rewards')

        case 'transaction_dropped':
          uiSystem.setMessage(body.message, 3)
          return log('Your rewards are on their way')

        case 'transaction_success':
          uiSystem.setMessage(body.message, 3)
          return log('Your rewards have already been sent')

        case 'error':
          uiSystem.setMessage(
            "Sorry! We couldn't prepare your reward: ${body.message}",
            3
          )
          return log(`Sorry! We couldn't prepare your reward: ${body.message}`)

        default:
          uiSystem.setMessage(
            'Sorry! There was a problem with ours servers, please try again later',
            3
          )
          return log('Sorry! There was a problem with ours servers')
      }

      channel.sendActions(props.onTreasure)
    } catch (e) {
      uiSystem.setMessage(
        'Sorry! There was a problem with ours servers, please try again later',
        3
      )
      log('failed to reach URL', e.message)
    }
  })
}
