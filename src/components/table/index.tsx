import {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import type { DataType, ColumnsType, SortOrder, columDatasType, PaginationType } from './interface'
import {Group, Head} from './thead'
import {Body} from './tbody'
import {Pagination} from './pagination'
import { throttle } from '../../util';

const DEFAULT_PAGE_SIZE = 20;
const THROTTLE_DELAY = 100;

interface TableType {
    columns: ColumnsType<DataType>[];
    dataSource: DataType[];
    scrollToFirstRowOnChange?: boolean;
    pagination: Pick<PaginationType, "current"> & {pageSize: number};
    fixLeft?: number;
    fixRight?: number;
    scroll?: {
        x?: number;
        y?: number
    }
}

function useColumnWidth(columns: readonly ColumnsType<DataType>[], fixLeft: number, fixRight: number, x?: number) {
    return useMemo(() => {
        const columCount:number = columns.length;
        let tempSum:number = 0, widthCount:number = 0, evenWidth:number = 0;
        let columDatas:columDatasType[] = [];
        for (let i = 0; i < columCount; i++) {
            const column = columns[i];
            if (typeof column.width !== 'undefined' ) {
                tempSum += column.width;
                widthCount++;
            }
            columDatas.push({
                ...column,
                width: column.width || 0,
                fixed: i<fixLeft? 'left' : (i>columCount-fixRight-1) ? 'right' : false,
                offset: 0
            })
        }

        // get widths for autoextend
        widthCount = columCount - widthCount;
        if (widthCount > 0 && x) {
            evenWidth = (x-tempSum)/widthCount
        }

        // get offsets for fixed left columns
        tempSum = 0;
        for (let i = 0; i < columCount; i++) {
            const column = columDatas[i];
            if (typeof column.width !== 'undefined' && evenWidth !== 0) {
                column.width = evenWidth
            }
            column.offset = tempSum
            tempSum += column.width ?? 0
        }

        // get offsets for fixed right columns
        tempSum = 0;
        for (let i = 1; i <= fixRight; i++) {
            const column = columDatas[columCount-i];
            column.offset = tempSum
            tempSum += column.width ?? 0
        }
        return columDatas;
    }, [columns, fixLeft, fixRight, x]);
}

export function Table({columns, dataSource, scroll, pagination, fixLeft=0, fixRight=0}: TableType) {

    const [sortedSource, setSorted] = useState<DataType[]>(dataSource);
    const {x, y} = scroll || {}
    const columDatas:columDatasType[] = useColumnWidth(columns, fixLeft, fixRight, x);
    // console.log('dataSource', dataSource)

    // pagination related
    let {pageSize = DEFAULT_PAGE_SIZE, current = 1} = pagination
    let pages = useMemo(() => Math.ceil(dataSource.length/pageSize), [dataSource, pageSize])
    const [page, setPage] = useState<number>(current);
    const [currentSource, setSource] = useState<DataType[]>(dataSource.slice(0, pageSize));
    
    const handleChangePage = useCallback(
        (nextPage: number) => {
            const begin = (nextPage-1) * pageSize;
            setSource(sortedSource.slice(begin, begin+pageSize))
            setPage(nextPage);
        }, [pageSize, sortedSource]
    );

    const [sortedKey, setSortKey] = useState<string | number>('');
    const [sortOrder, setSortOrder] = useState<SortOrder>(null);
    const handleSort = useCallback(
        (column: string | number) => {
            let newOrder: SortOrder = 'ascend'
            let newSource: DataType[] = dataSource
            if (sortedKey === column) {
                if (sortOrder==='ascend') {
                    newOrder = 'descend';
                    setSortKey(column);
                    newSource = dataSource.sort((a:any, b:any) => (b[column] as number) - (a[column] as number))
                } else if (sortOrder==='descend') {
                    newOrder = null;
                    setSortKey('');
                }
            } else {
                newSource = dataSource.sort((a:any, b:any) => (a[column] as number) - (b[column] as number))
                setSortKey(column);
            }

            console.log('handleSort', newOrder, sortedKey)
            setPage(1);
            setSortOrder(newOrder);
            setSorted(newSource);
            setSource(newSource.slice(0, pageSize))
        }, [pageSize, dataSource, sortOrder, sortedKey]
    );
    useEffect(() => {
        setPage(1);
        setSortKey('');
        setSortOrder(null);
        setSorted(dataSource);
        setSource(dataSource.slice(0, pageSize))
    }, [dataSource, pageSize]);

    const theadRef = useRef<HTMLDivElement>();
    const tbodyRef = useRef<HTMLDivElement>();
   
    // scroll head with body together when scrolling horizontally
    useEffect(() => {
        if (tbodyRef.current) {
            const thisRef = tbodyRef.current;
            const onContainerScroll = () => {
                if (!thisRef) {
                    return;
                }
                
                // console.log('onContainerScroll', tbodyRef.current.scrollLeft, tbodyRef.current.scrollTop, tbodyRef.current.offsetWidth, tbodyRef.current.offsetHeight)
                theadRef.current && (theadRef.current.scrollLeft = thisRef.scrollLeft)
            };
            thisRef.addEventListener('scroll', throttle(onContainerScroll, THROTTLE_DELAY, {trailing: true}) );
    
            return () => {
                thisRef && thisRef.removeEventListener('scroll', onContainerScroll );
            };
        }
    }, [tbodyRef]);
    
    return (<div className="w-full">
        <div className="bg-white border-1 relative">
            {
                y ? (<>
                    <div className="overflow-hidden" ref={theadRef as React.RefObject<HTMLDivElement>}>
                        <table className="table-fixed min-w-full border-collapse border" style={{width: x ?? '100%'}}>
                            <Group columDatas={columDatas} />
                            <Head columDatas={columDatas} sortedKey={sortedKey} sortOrder={sortOrder} onSort={handleSort} />
                        </table>
                    </div>
                    <div className="overflow-y-auto" style={{maxHeight: y}} ref={tbodyRef as React.RefObject<HTMLDivElement>}>
                        <table className="overflow-scroll max-h-full table-fixed min-w-full border-collapse" style={{width: x ?? '100%'}}>
                            <Group columDatas={columDatas} />
                            <Body columDatas={columDatas} sortedKey={sortedKey} dataSource={currentSource} />
                        </table>
                    </div>
                </>): (
                    <div className="overflow-hidden">
                        <table className="table-fixed min-w-full border-collapse" style={{width: x ?? '100%'}}>
                            <Group columDatas={columDatas} />
                            <Head columDatas={columDatas} sortedKey={sortedKey} sortOrder={sortOrder} onSort={handleSort} />
                            <Body columDatas={columDatas} dataSource={currentSource} />
                        </table>
                    </div>
                )
            }
        </div>
        <Pagination pages={pages} current={page} onChange={handleChangePage} />
    </div>);
}