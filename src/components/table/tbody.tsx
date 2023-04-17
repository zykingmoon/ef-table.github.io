import { BodyProps } from './interface'

export function Body({ dataSource, columDatas, sortedKey }: BodyProps) {
    // console.log('dataSource', dataSource)
    
    return (<tbody className="">
    {
        dataSource.map((ds: any) => {
            return (<tr key={`$student-${ds.key}`} className="bg-white hover:bg-gray-200 border-b border-gray-400 group">
                {columDatas.map(({dataIndex, fixed, offset}) => {
                    let offsetStyle: React.CSSProperties = {};
                    let classNames: string[] = ['group-hover:bg-gray-200']
                    if (fixed === 'left') {
                        classNames.push('sticky bg-gray-100')
                        offsetStyle = {left: offset}
                    } else if (fixed === 'right') {
                        classNames.push('sticky bg-gray-100')
                        offsetStyle = {right: offset}
                    }
                    sortedKey===dataIndex && classNames.push('bg-gray-300')
                    // console.log('td', dataIndex, index, widthLeft[index], widthRight[columnLen-index])
                    return <td key={`${ds.key} - ${dataIndex} - ${ds[dataIndex]}`}
                        style={{...offsetStyle}} 
                        className={classNames.join(' ')}>
                        <div className='p-2'>{ds[dataIndex]}</div>
                    </td>})}
            </tr>)
        })
    }
</tbody>)
}
