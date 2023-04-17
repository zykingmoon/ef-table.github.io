import * as React from 'react';
import { PaginationType } from './interface'
import { Icon } from './icon'

export function Pagination({ current = 1, pages, onChange }: PaginationType) {
    // const pages = Math.ceil(total/pageSize);
    const jumpPrev = current > 4
    const jumpNext = (pages - current) > 3
    const pageList = []

    for(let i= current > 3 ? current-2 : 2; (i < current+3 && i< pages); i++) {
        pageList.push(i)
    }
    // console.log('Pagination', current,  pages, pageList)

    const handleClick = React.useCallback(
      (page: number) => () => onChange && onChange(page),
      [onChange]
    );

    return (<ul className={`flex justify-center mt-5`}>
        <li title="上一页" className={`page ${current===1 ? "text-gray-400" : "pageActive"}`} >
            <button className="pageBtn" type="button" disabled={current===1} onClick={handleClick(current-1)}>
                <Icon type="prev" />
            </button>
        </li>
        <li title="第 1 页" className={`page ${current===1 ? "pageCurrent" : "pageActive"}`}>
            <button className="pageBtn" type="button" onClick={handleClick(1)}>
                1
            </button>
        </li>
        {
            jumpPrev && <li title="向前 5 页" className="pageActive page">
                <button className="pageBtn" type="button" onClick={handleClick(current > 5 ? current-5 : 1)}>
                    <span>•••</span>
                </button>
            </li>
        }
        {
            pageList.map(page => 
                <li title={`第 ${page} 页`} className={`page ${current===page ? "pageCurrent" : "pageActive "}`} key={page}>
                    <button className="pageBtn" type="button" onClick={handleClick(page)}>
                        {page}
                    </button>
                </li>)
        }
        {
            jumpNext && <li title="向后 5 页" className={`pageActive page`}>
                <button className="pageBtn" type="button" onClick={handleClick(pages-current > 5 ? current+5 : pages)}>
                    <span>•••</span>
                </button>
            </li>
        }
        <li title={`第 ${pages} 页`} className={`page ${current===pages ? "pageCurrent" : "pageActive"}`}>
            <button className="pageBtn" type="button" onClick={handleClick(pages)}>
                {pages}
            </button>
        </li>
        <li title="下一页" className={`page ${current===pages ? "text-gray-400" : "pageActive"}`}>
            <button className="pageBtn" type="button" disabled={current===pages} onClick={handleClick(current+1)}>
                <Icon type="next" />
            </button>
        </li>
    </ul>)
}
