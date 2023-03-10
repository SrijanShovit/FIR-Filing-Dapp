import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useAddress,useContract,useContractRead} from "@thirdweb-dev/react";
import Header from './components/Header';
import Complaint from './components/Complaint';
import Status from './components/Status';
import Admin from './components/Admin';


export default function Home() {

  //gives us user's address
  const address = useAddress();
  const {contract} = useContract("0x70017Cd7FEf1057Cb7C556554d184e4521e8d34E");
  
  const { data:officer} = useContractRead(contract, "officer");

  // console.log("Officer is : ",officer);
  // console.log("Current address is : ",address);

  return (
    <div className={styles.container}>
      <Head>
        <title>Complaint Registration</title>
        <meta name="description" content="This is a Complaint filing Dapp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <Complaint/>
      <Status/>
      {officer=== address && (<Admin/>)}
    </div>
  )
}
