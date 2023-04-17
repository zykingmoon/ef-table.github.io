import { Table } from '../components/table'
import {useState, useEffect} from 'react';
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

const TableSample: React.FC = () => {
  const [data, setData] = useState<DataType[]>([])
  useEffect(() => {
    const newData: DataType[] = [];
    for (let i = 0; i < 90; i++) {
      newData.push({
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
    setData(newData)
  }, []);
  return <Table
    columns={columns}
    dataSource={data}
    // onChange={onChange}
    pagination={{ pageSize: 20 }}
    scroll={{ y: 240, x: 1300 }}
    fixLeft={2}
    fixRight={1}
    // pagination={false}
  />
}
  ;

export {
  TableSample
}
