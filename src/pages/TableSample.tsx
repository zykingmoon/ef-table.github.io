import { Table } from '../components/table'
import { DataType, ColumnsType } from '../components/table/interface'


const columns: ColumnsType<DataType>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 100,
  },
  {
    title: 'Chinese Score',
    dataIndex: 'chinese',
    // sorter: true,
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      // multiple: 3,
    },
  },
  {
    title: 'English Score',
    dataIndex: 'english',
    sorter: true,
  },
  {
    title: 'Math Score',
    dataIndex: 'math',
    sorter: true,
  },
  {
    title: 'Physics Score',
    dataIndex: 'physics',
    sorter: true
  },
  {
    title: 'Chemistry Score',
    dataIndex: 'chemistry',
    sorter: true
  },
  {
    title: 'Biology Score',
    dataIndex: 'biology',
    sorter: true
  },
  {
    title: 'Geography Score',
    dataIndex: 'geography',
    sorter: true
  },
  {
    title: 'History Score',
    dataIndex: 'history',
    sorter: true
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    width: 100,
  },
];
const data: DataType[] = [];
for (let i = 0; i < 90; i++) {
  data.push({
    key: i,
    name: `Student ${i}`,
    age: 20 + i,
    gender: ['Male', 'Female'][i % 2],
    chinese: Math.round(Math.random() * 100),
    math: Math.round(Math.random() * 100),
    english: Math.round(Math.random() * 100),
    physics: Math.round(Math.random() * 100),
    chemistry: Math.round(Math.random() * 100),
    biology: Math.round(Math.random() * 100),
    geography: Math.round(Math.random() * 100),
    history: Math.round(Math.random() * 100),
  });
}

// ant-table-cell ant-table-column-sort ant-table-column-has-sorters
// ant-table-cell ant-table-column-has-sorters
// anticon anticon-caret-down ant-table-column-sorter-down
// anticon anticon-caret-down ant-table-column-sorter-down active
// const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
//   console.log('params', pagination, filters, sorter, extra);
// };

const TableSample: React.FC = () => 
  <Table
    columns={columns}
    dataSource={data}
    // onChange={onChange}
    pagination={{ pageSize: 20 }}
    scroll={{ y: 240, x: 1300 }}
    fixLeft={2}
    fixRight={1}
    // pagination={false}
  />;



export {
  TableSample
}
