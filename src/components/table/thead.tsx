import {useCallback} from 'react';
import { HeadProps } from './interface'
import { Icon } from './icon'

export function Group({ columDatas }: Pick<HeadProps, "columDatas">) {
    return (<>
        <colgroup>
            {
                columDatas.map(column =>  <col style={{width: column.width ?? 'auto'}} key={`col-head-${column.dataIndex}`} />)
            }
        </colgroup>
    </>)
}

export function Head({ columDatas, sortedKey, sortOrder, onSort }: HeadProps) {
    // console.log('columDatas', columDatas)

    const handleSorter = useCallback(
        (column: string | number) => () => {onSort && onSort(column)},
        [onSort]
    );

    return (<thead className="">
        <tr>
            {
                columDatas.map(column => {
                    let sortUpColor: string = '';
                    let sortDownColor: string = '';
                    let baseClass: string[] = ['text-white p-2 h-12 text-left'], divClass: string = '';
                    if (column.sorter) {
                        const isSortedColumn = sortedKey === column.dataIndex;
                        baseClass.push('cursor-pointer')
                        baseClass.push(isSortedColumn ? 'bg-gray-600' : 'bg-gray-500')
                        sortUpColor = sortOrder==='ascend' ? 'text-white' : 'text-gray-400';
                        sortDownColor = sortOrder==='descend' ? 'text-white' : 'text-gray-400';
                    } else {
                        baseClass.push('bg-gray-500')
                    }
                    let offsetStyle: React.CSSProperties = {};
                    if (column.fixed === 'left') {
                        baseClass.push('sticky z-10');
                        column.sorter && (divClass = 'bg-gray-500');
                        offsetStyle = {left: column.offset}
                    } else if (column.fixed === 'right') {
                        baseClass.push('sticky z-10');
                        column.sorter && (divClass = 'bg-gray-500');
                        offsetStyle = {right: column.offset}
                    }
                    return (<th 
                            className={baseClass.join(' ')}
                            scope="col"
                            style={{...offsetStyle}}
                            key={column.dataIndex}>
                                {
                                    column.sorter ? <div className={`flex relative ${divClass}`} onClick={handleSorter(column.dataIndex)}>
                                        <span className="pr-5">{column.title}</span>
                                        <div className="absolute right-1 top-1/2 -mt-2 ">
                                            <div className={`sorter ${sortUpColor}`}><Icon type="up" /></div>
                                            <div className={`sorter sorterDown ${sortDownColor}`}><Icon type="down" /></div>
                                        </div>
                                    </div> : <div className={divClass}>{column.title}</div>
                                }
                                
                        </th>)
                })
            }
        </tr>
    </thead>)
}
