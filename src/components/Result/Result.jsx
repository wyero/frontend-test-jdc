import React from "react";
import style from "./style.module.css";
import Card from "../UI/Card/Card";
import { ResultText } from "./components/ResultComp";

const Result = (props) => {
  return (
    <Card className={style.result}>
      {props.onDataUser.map((item) => (
        <main key={item.id}>
          <ResultText label="Nama" value={item.name} />
          <ResultText label="NIK" value={item.nik} />
          <ResultText label="Nomor Kartu Keluarga" value={item.nokk} />
          <ResultText label="Foto KTP" image={item.idCard} />
          <ResultText label="Foto Kartu Keluarga" image={item.photoKK} />
          <ResultText label="Umur" value={`${item.age} Tahun`} />
          <ResultText label="Jenis Kelamin" value={item.gender} />
          <ResultText label="Provinsi" value={item.provinceName} />
          <ResultText label="Kab/Kota" value={item.regencyName} />
          <ResultText label="Kecamatan" value={item.subdistrictName} />
          <ResultText label="Kelurahan/Desa" value={item.wardName} />
          <ResultText label="Alamat" value={item.address} />
          <ResultText label="RT" value={item.rt} />
          <ResultText label="RW" value={item.rw} />
          <ResultText
            label="Penghasilan Sebelum Pandemi"
            value={`Rp. ${item.incomeBefore}`}
          />
          <ResultText
            label="Penghasilan Setelah Pandemi"
            value={`Rp. ${item.incomeAfter}`}
          />
          {item.reasonHelp !== "" ? (
            <ResultText
              label="Alasan Membutuhkan Pekerjaan"
              value={item.reasonHelp}
            />
          ) : (
            <ResultText
              label="Alasan Membutuhkan Pekerjaan"
              value={item.otherReason}
            />
          )}
        </main>
      ))}
    </Card>
  );
};

export default Result;
