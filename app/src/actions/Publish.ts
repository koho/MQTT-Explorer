import { Action, ActionTypes } from '../reducers/Publish'
import { AppState } from '../reducers'
import { Base64Message } from '../../../backend/src/Model/Base64Message'
import { Dispatch } from 'redux'
import { makePublishEvent, rendererEvents } from '../../../events'

export const setTopic = (topic?: string): Action => {
  return {
    topic,
    type: ActionTypes.PUBLISH_SET_TOPIC,
  }
}

export const setResponseTopic = (responseTopic?: string): Action => {
  return {
    responseTopic,
    type: ActionTypes.PUBLISH_SET_RESP_TOPIC,
  }
}

export const setPayload = (payload?: string): Action => {
  return {
    payload,
    type: ActionTypes.PUBLISH_SET_PAYLOAD,
  }
}

export const setQoS = (qos: 0 | 1 | 2): Action => {
  return {
    qos,
    type: ActionTypes.PUBLISH_SET_QOS,
  }
}

export const setEditorMode = (editorMode: string): Action => {
  return {
    editorMode,
    type: ActionTypes.PUBLISH_SET_EDITOR_MODE,
  }
}

export const publish = (connectionId: string) => (dispatch: Dispatch<Action>, getState: () => AppState) => {
  const state = getState()
  const topic = state.publish.manualTopic ?? state.tree.get('selectedTopic')?.path()

  if (!topic) {
    return
  }

  const publishEvent = makePublishEvent(connectionId)
  const mqttMessage = {
    topic,
    payload: state.publish.payload ? Base64Message.fromString(state.publish.payload) : null,
    retain: state.publish.retain,
    qos: state.publish.qos,
    responseTopic: state.publish.responseTopic,
  }
  rendererEvents.emit(publishEvent, mqttMessage)
}

export const toggleRetain = (): Action => {
  return {
    type: ActionTypes.PUBLISH_TOGGLE_RETAIN,
  }
}
