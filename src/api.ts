/* eslint-disable @typescript-eslint/no-unused-vars */
import { REACT_APP_BACKEND_ENDPOINT } from './constants'
import { OptionsType } from './styles'
import { IAppState } from './react-app-env'

export const save = (payload: IAppState) => {
  return fetch(`${REACT_APP_BACKEND_ENDPOINT}/save`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload.lists),
  })
    .then((response) => {
      return response.json()
    })
    .catch((err: Error) => {
      // eslint-disable-next-line no-console
      console.log(err.message)
    })
}

export const load = (): Promise<IAppState> => {
  return (async () => {
    const kuve = `${REACT_APP_BACKEND_ENDPOINT}/load`
    const Response = await fetch(kuve)
    const res = await Response.json()
    Object.entries(res).map((r: any) => (r[1] as any).pName)

    const projectNamesDD = Object.entries(res)
      .map((r) => (r[1] as any).pName)
      .map((rl) => ({ value: rl, label: rl } as OptionsType))

    return {
      ...res,
      dropDownItems: projectNamesDD,
      draggedItem: undefined,
    } as Promise<IAppState>
  })()
}
export const ingestData = (): Promise<IAppState> => {
  return (async () => {
    const kuve = `${REACT_APP_BACKEND_ENDPOINT}/addi`
    const Response = await fetch(kuve)
    const res = await Response.json()

    return {
      ...res,
      dropDownItems: [],
      draggedItem: undefined,
    } as Promise<IAppState>
  })()
}

/* export const load = () => {
  const kuve = `${REACT_APP_BACKEND_ENDPOINT}/load`
  return fetch(kuve, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then(
    (response) => {
      const k = response
      const r = k
      return { ...response.json(), draggedItem: undefined } as Promise<
        IAppState
      >
    },
    (e) => console.log(e)
  )
}
 */
