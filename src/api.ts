/* eslint-disable @typescript-eslint/no-unused-vars */
import { REACT_APP_BACKEND_ENDPOINT } from './constants'
import { OptionsType } from './styles'
import { DropDown, IAppState } from './react-app-env'

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

    /*     const projectNamesDD: DropDown = Object.entries(res.lists)
      .map((r) => (r[1] as any).listId)
      .map((rl) => ({ value: rl, label: rl } as OptionsType))
 */

    const projectNamesDD: DropDown = {
      inPc: Object.entries(res.lists)
        .filter((t) => (t[1] as any).tasks.length > 0)
        .map(
          (rl) =>
            (({
              value: (rl[1] as any).listId,
              label: (rl[1] as any).listId,
            } as unknown) as OptionsType)
        ),
      outPc: Object.entries(res.lists)
        .filter((t) => (t[1] as any).tasks.length === 0)
        .map(
          (rl) =>
            (({
              value: (rl[1] as any).listId,
              label: (rl[1] as any).listId,
            } as unknown) as OptionsType)
        ),
    }

    return {
      ...res,
      dropDownItems: projectNamesDD,
      sourceIngested: res.sourceIngested[0],
      draggedItem: undefined,
    } as Promise<IAppState>
  })()
}
export const ingestData = (): Promise<IAppState> => {
  return (async () => {
    const kuve = `${REACT_APP_BACKEND_ENDPOINT}/addi`
    const Response = await fetch(kuve)
    const res = await Response.json()
    const clonedMongo = JSON.parse(
      JSON.stringify({ listId: (res as any).pName, tasks: (res as any).tasks })
    )

    const ere = {
      ...res,
      dropDownItems: {} as DropDown,
      draggedItem: undefined,
      sourceIngested: clonedMongo,
    } as Promise<IAppState>

    return ere
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
