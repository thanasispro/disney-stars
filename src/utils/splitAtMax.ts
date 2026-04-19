export const splitAtMax = (items: string[], max: number) => ({
    visible: items.slice(0, max),
    remaining: Math.max(0, items.length - max),
})
