export const toJSON = (text: string) => {
    const json = JSON.parse(text.replace('```json\n', '').replace('\n```', ''))
    return json as Record<string, string>
}