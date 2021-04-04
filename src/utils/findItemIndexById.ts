interface Item {
  listid: string
}

export const findItemIndexById = <T extends Item>(items: T[], id: string) => {
  return items.findIndex((item: T) => item.listid === id)
}
