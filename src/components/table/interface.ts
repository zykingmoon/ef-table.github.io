export interface DataType {
    key: React.Key;
    name: string;
    age: number;
    gender: string;
    chinese: number;
    math: number;
    english: number;
    physics: number;
    chemistry: number;
    biology: number;
    geography: number;
    history: number;
    total?: string;
}

export type SortOrder = 'ascend' | 'descend' | null;
export type CompareFn<T> = (a: T, b: T, sortOrder?: SortOrder) => number;

export type Align = 'left' | 'right' | 'center';

export type IconType = 'prev' | 'next' | 'up' | 'down' | undefined;
  
export interface ColumnsType<RecordType> {
    title: string | React.ReactNode;
    dataIndex: string | number;
    width?: number;
    // Sorter
    sorter?:
      | boolean
      | CompareFn<RecordType>
      | {
          compare?: CompareFn<RecordType>;
          /** Config multiple sorter order priority */
          multiple?: number;
          sortOrder?: SortOrder;
          defaultSortOrder?: SortOrder;
          sortDirections?: SortOrder[];
        };
    // render: function(text, record, index) {}
}

export interface columDatasType extends ColumnsType<DataType> {
    fixed: false | 'left' | 'right';
    offset: number;
}

export interface HeadProps {
    columDatas: columDatasType[];
    sortedKey?: string | number;
    sortOrder?: SortOrder;
    onSort?: (column: string | number) => void;
}

export interface BodyProps {
    dataSource: DataType[];
    columDatas: columDatasType[];
    sortedKey?: string | number;
}
export interface PaginationType {
    current?: number;
    pages: number;
    onChange: (page: number) => void;
}