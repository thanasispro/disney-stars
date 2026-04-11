import * as XLSX from 'xlsx'
import { type DisneyCharacter } from '../types/disney'

export function exportCharactersToXlsx(characters: DisneyCharacter[]): void {
    const rows = characters.map((c) => ({
        Name: c.name,
        'Film Count': c.films.length,
        Films: c.films.join(', '),
    }))

    const worksheet = XLSX.utils.json_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Characters')
    XLSX.writeFile(workbook, 'disney-characters.xlsx')
}
