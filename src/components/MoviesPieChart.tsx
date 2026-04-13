import { useState, useEffect } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import 'highcharts/modules/accessibility'
import { type DisneyCharacter } from '../types/disney'
import { exportCharactersToXlsx } from '../utils/exportXlsx'
import { useAppSelector } from '../hooks/useAppSelector'
import { Button } from './Button'

const MAX_SLICES = 30

export const MoviesPieChart = ({ characters, isLoading }: { characters: DisneyCharacter[], isLoading: boolean }) => {
    const [includeShortFilms, setIncludeShortFilms] = useState(false)
    const [chartHeight, setChartHeight] = useState(window.innerWidth < 768 ? 280 : 380)
    const isDark = useAppSelector((s) => s.theme.theme) === 'dark'

    useEffect(() => {
        const onResize = () => setChartHeight(window.innerWidth < 768 ? 280 : 380)
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    const all = characters
        .map((c) => ({
            name: c.name,
            y: (c.films?.length ?? 0) + (includeShortFilms ? (c.shortFilms?.length ?? 0) : 0),
            films: c.films ?? [],
            shortFilms: c.shortFilms ?? [],
        }))
        .filter((c) => c.y > 0)
        .sort((a, b) => b.y - a.y)

    const top = all.slice(0, MAX_SLICES)
    const others = all.slice(MAX_SLICES)
    const othersTotal = others.reduce((sum, c) => sum + c.y, 0)

    const data = othersTotal > 0
        ? [...top, { name: `Others (${others.length})`, y: othersTotal, films: [], shortFilms: [] }]
        : top

    const labelColor = isDark ? '#d1d5db' : '#374151'

    const options: Highcharts.Options = {
        chart: {
            type: 'pie',
            backgroundColor: 'transparent',
            height: chartHeight,
            animation: { duration: 800, easing: 'easeOutBounce' },
        },
        title: { text: undefined },
        tooltip: {
            formatter() {
                const point = this as unknown as Highcharts.Point & { films: string[]; shortFilms: string[]; percentage: number }
                const filmList = point.films.length ? `<br/><b>Films:</b> ${point.films.join(', ')}` : ''
                const shortFilmList = includeShortFilms && point.shortFilms.length
                    ? `<br/><b>Short Films:</b> ${point.shortFilms.join(', ')}`
                    : ''
                if (!filmList && !shortFilmList) return `<b>${point.name}</b><br/>${point.percentage?.toFixed(1)}% of total`
                return `<b>${point.name}</b><br/>${point.percentage?.toFixed(1)}% of total${filmList}${shortFilmList}`
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
        accessibility: {
            enabled: true,
            point: {
                valueDescriptionFormat: '{point.name}: {point.percentage:.1f}% of total films',
            },
        },
        credits: { enabled: false },
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
                <label className={`flex items-center gap-2 text-sm cursor-pointer select-none ${isLoading ? 'opacity-50 pointer-events-none text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-400'}`}>
                    <input
                        type="checkbox"
                        checked={includeShortFilms}
                        onChange={(e) => setIncludeShortFilms(e.target.checked)}
                        className="rounded"
                        aria-label="Include short films in chart"
                        disabled={isLoading}
                    />
                    Include Short Films
                </label>

                <Button onClick={() => exportCharactersToXlsx(characters)} variant="secondary" disabled={isLoading || !data.length}>
                    Export XLSX
                </Button>
            </div>

            {isLoading
                ? <div className="animate-pulse h-96 rounded-lg bg-gray-100 dark:bg-gray-800" />
                : !data.length
                ? <div className="flex items-center justify-center h-48 text-gray-400 dark:text-gray-500 text-sm">No film data available for the current characters.</div>
                : <HighchartsReact highcharts={Highcharts} options={options} />
            }
        </div>
    )
}
