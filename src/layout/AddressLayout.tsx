import { useEffect, useState } from 'react';
import { getAllTransactions } from '../services/explorer.ts';
import BasicsCard from '../components/BasicsCard.tsx';
import DappsCard from '../components/DappsCard.tsx';

const AddressPage = () => {
  const address = window.location.search.split('=')[1];
  const [transactionList, setTransactionList] = useState<any[]>([]);

  const fetchTransactionList = async () => {
    const transactions: any[] = await getAllTransactions(address);
    setTransactionList(transactions);
  };

  useEffect(() => {
    if (address === '' || address.length !== 42 || !address.startsWith('0x')) {
      window.location.search = '';
      return;
    }
    fetchTransactionList();
  }, [address]);

  return (
    <>
      <div className="grid mt-20 place-items-center">
        <div className="grid place-items-center">
          <h1 className="font-bold text-6xl text-white mb-10">zkFlow</h1>
          <BasicsCard address={address} transactionList={transactionList} />
          <br />
          <DappsCard address={address} transactionList={transactionList} />
          <div className="text-center text-white mb-8">
            <h5>This is a fork version from ByFishh</h5>
            <h5>you can contact me on twitter (@0xNigromante).</h5>
            <br />
            <h5>If you want to pay me a coffe, feel free to send it to this address</h5>
            <h5>0x1Ba79B49F1210A78724354B6C2EE6bDDF91F34E1</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressPage;
