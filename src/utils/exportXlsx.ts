import * as XLSX from 'xlsx'
import { type DisneyCharacter } from '../types/disney'

export const exportCharactersToXlsx = (characters: DisneyCharacter[]): void => {
    const rows = characters.map((c) => ({
        Name: c.name,
        'Film Count': c.films.length + c.shortFilms.length,
        Films: c.films.join(', '),
        'Short Films': c.shortFilms.join(', '),
    }))

    const worksheet = XLSX.utils.json_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Characters')
    XLSX.writeFile(workbook, 'disney-characters.xlsx')
}
