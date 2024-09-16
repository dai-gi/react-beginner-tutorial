// 変数名は基本、コンポーネント名に合わせる
export const Title = () => {
  const name = 'ueda';
  //              ↓ テンプレートリテラル
  return <div>{name.toUpperCase()}家計簿アプリ</div>;
};
