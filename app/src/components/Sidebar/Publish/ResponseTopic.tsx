import ClearAdornment from '../../helper/ClearAdornment'
import React, { useCallback, useMemo, useRef } from 'react'
import { FormControl, Input, InputLabel } from '@material-ui/core'
import { publishActions } from '../../../actions'
import { bindActionCreators } from 'redux'
import { AppState } from '../../../reducers'
import { connect } from 'react-redux'

function ResponseTopic(props: { actions: typeof publishActions; selectedTopic?: string }) {

  const inputElement = useRef<HTMLInputElement>(null)

  const updateTopic = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    props.actions.setResponseTopic(e.target.value)
  }, [])

  const clearTopic = useCallback(() => {
    props.actions.setResponseTopic('')
    inputElement.current?.focus()
  }, [])

  const onTopicBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      props.actions.setResponseTopic('')
    }
  }, [])

  return useMemo(
    () => (
      <div>
        <FormControl style={{ width: '100%' }}>
          <InputLabel htmlFor="response-topic">Response Topic</InputLabel>
          <Input
            inputRef={inputElement}
            id="response-topic"
            startAdornment={<span />}
            endAdornment={<ClearAdornment action={clearTopic}/>}
            onBlur={onTopicBlur}
            onChange={updateTopic}
            multiline={false}
            placeholder={props.selectedTopic ?? 'example/topic'}
          />
        </FormControl>
      </div>
    ),
    []
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(publishActions, dispatch),
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    selectedTopic: state.tree.get('selectedTopic')?.path(),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponseTopic)
