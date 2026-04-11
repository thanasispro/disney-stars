import { useState } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import { type DisneyCharacter } from '../types/disney'
import { exportCharactersToXlsx } from '../utils/exportXlsx'
import { Button } from './Button'

const MAX_SLICES = 30

export const MoviesPieChart = ({ characters }: { characters: DisneyCharacter[] }) => {
    const [includeShortFilms, setIncludeShortFilms] = useState(false)

    const all = characters
        .map((c) => ({
            name: c.name,
            y: c.films.length + (includeShortFilms ? c.shortFilms.length : 0),
            films: c.films,
            shortFilms: c.shortFilms,
        }))
        .filter((c) => c.y > 0)
        .sort((a, b) => b.y - a.y)

    const top = all.slice(0, MAX_SLICES)
    const others = all.slice(MAX_SLICES)
    const othersTotal = others.reduce((sum, c) => sum + c.y, 0)

    const data = othersTotal > 0
        ? [...top, { name: `Others (${others.length})`, y: othersTotal, films: [], shortFilms: [] }]
        : top

    const isDark = document.documentElement.classList.contains('dark')
    const labelColor = isDark ? '#d1d5db' : '#374151'

    const options: Highcharts.Options = {
        chart: {
            type: 'pie',
            backgroundColor: 'transparent',
            height: window.innerWidth < 768 ? 280 : 380,
            animation: { duration: 800, easing: 'easeOutBounce' },
        },
        title: { text: undefined },
        tooltip: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter(this: any) {
                const point = this.point as Highcharts.Point & { films: string[]; shortFilms: string[] }
                if (!point.films.length) return `<b>${this.point.name}</b><br/>${this.percentage?.toFixed(1)}% of total`
                const filmList = point.films.join(', ')
                const shortFilmList = includeShortFilms && point.shortFilms.length
                    ? `<br/><b>Short Films:</b> ${point.shortFilms.join(', ')}`
                    : ''
                return `<b>${this.point.name}</b><br/>${this.percentage?.toFixed(1)}% of total<br/><b>Films:</b> ${filmList}${shortFilmList}`
            },
        },
        plotOptions: {
            pie: {
                innerSize: '50%',
                dataLabels: {
                    enabled: true,
                    style: { color: labelColor, fontSize: '12px' },
                    format: '{point.name}',
                },
                animation: { duration: 800 },
            },
        },
        series: [{ type: 'pie', data }],
        accessibility: { enabled: false },
        credits: { enabled: false },
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={includeShortFilms}
                        onChange={(e) => setIncludeShortFilms(e.target.checked)}
                        className="rounded"
                        aria-label="Include short films in chart"
                    />
                    Include Short Films
                </label>

                <Button onClick={() => exportCharactersToXlsx(characters)} variant="secondary" disabled={!data.length}>
                    Export XLSX
                </Button>
            </div>

            {!data.length
                ? <div className="flex items-center justify-center h-48 text-gray-400 dark:text-gray-500 text-sm">No film data available for the current characters.</div>
                : <HighchartsReact highcharts={Highcharts} options={options} />
            }
        </div>
    )
}
