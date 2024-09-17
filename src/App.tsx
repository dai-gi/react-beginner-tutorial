// メインとなるコンポーネントで、ここを起点に他のコンポーネントをくっつけたり、ルーティングの設定を行ったりする場所
// UIの共通部分（ヘッダーやナビバー、フッターなど）を書く場所でもある
// 一番初めに呼び出されるコンポーネント

import {
  Flex,
  Button,
  Checkbox,
  Input,
  Text,
  ChakraProvider
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';

type Record = {
  id: number;
  title: string;
  amount: number;
  isIncome: boolean;
};

function App() {
  // ReactフックのuseStateをrecordsに代入することによって、後にrecordsに代入される値の状態を監視することができる
  //                ↓ recordsを更新するための関数（慣習的に接頭辞に「set」をつける）
  const [records, setRecords] = useState<Record[]>([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [isIncome, setIsIncome] = useState(false);

  // 外部のデータと同期するときに使用するReactフック
  useEffect(() => {
    getRecords();

    async function getRecords() {
      const response = await fetch('http://localhost:3000/records');
      const data = await response.json();
      setRecords(data);
    }
  }, []);

  const addRecord = () => {
    const newRecord: Record = {
      id: records.length + 1,
      title,
      amount,
      isIncome
    };

    //    ↓ 配列をuseStateで更新する場合は、新しい配列を作成し、元の配列と一緒に渡す必要がある。これにより差分をuseStateが認識し、値を更新してくれる
    setRecords([...records, newRecord]);
    setTitle('');
    setAmount(0);
    setIsIncome(false);
  };

  // javascriptにhtmlを書く記法のことをJSXという
  // 拡張子はtsxになる
  return (
    // ↓ ChakraUIで定義されたコンポーネントを使用するには、適用したい範囲をChakraProviderで囲う必要がある
    <ChakraProvider>
      <div>
        <Text fontSize="2xl">家計簿アプリ</Text>
        <div>
          <Input
            placeholder="タイトルを入力"
            // ↓ プロップス：ChakuraUIのコンポーネントが固有で持っている属性のようなもので、スタイルなどを変更できる
            mb="4px"
            //         ↓ onChangeはイベント受け取ることができる
            onChange={(e) => setTitle(e.target.value)} // setTitleに入力値を渡すことでtitle変数の値が更新される
            // ↓ 初期値を設定することができる
            value={title}
          />
          <Input
            placeholder="金額を入力"
            mb="4px"
            type="nmber"
            onChange={(e) => setAmount(Number(e.target.value))}
            value={amount === 0 ? '' : amount}
          />
          <Flex align="center" justifyContent="space-between">
            <Checkbox
              onChange={() => setIsIncome(!isIncome)}
              isChecked={isIncome}>
              入金
            </Checkbox>
            <Button colorScheme="blue" onClick={addRecord}>
              追加
            </Button>
          </Flex>
        </div>
        <div>
          {records.map((record) => (
            //    ↓ keyを設定しないと全てのDOMが更新されてしまう
            <div key={record.id}>
              <Flex align="center" justifyContent="space-between">
                <Text>{record.title}</Text>
                <Text>
                  {record.isIncome ? '+' : '-'}
                  {record.amount}
                </Text>
              </Flex>
            </div>
          ))}
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
