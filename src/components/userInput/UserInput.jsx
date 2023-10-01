import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import Card from "../UI/Card/Card";
import { api } from "../../api/api";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Dropdown, InputText, InputRadio } from "../Input";

const UserInput = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    nik: "",
    nokk: "",
    idCard: null,
    photoKK: null,
    age: "",
    gender: "",
    provinceId: "",
    provinceName: "",
    regencyId: "",
    regencyName: "",
    subdistrictId: "",
    subdistrictName: "",
    wardId: "",
    wardName: "",
    address: "",
    rt: "",
    rw: "",
    incomeBefore: "",
    incomeAfter: "",
    reasonHelp: "",
    otherReason: "",
  });

  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);
  const [ward, setWard] = useState([]);
  const [other, setOther] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    age: "",
    serverError: "",
    idCard: "",
    photoKK: "",
  });

  useEffect(() => {
    provinceHandler();
  }, []);

  const provinceHandler = async () => {
    try {
      const response = await api.get("/provinces.json");
      setProvinces(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const regencyHandler = async (regency) => {
    try {
      if (regency) {
        const response = await api.get(`/regencies/${regency}.json`);
        setRegencies(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const subdistrictHandler = async (subdistricId) => {
    try {
      const response = await api.get(`/districts/${subdistricId}.json`);
      setSubdistricts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const wardHandler = async (wardId) => {
    try {
      const response = await api.get(`/villages/${wardId}.json`);
      setWard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeInputHandler = (input, event) => {
    if (input === "idCard" || input === "photoKK") {
      const file = event.target.files[0];
      if (file && file.size > 2 * 1024 * 1024) {
        setError({
          ...error,
          [input]: `Maksimal file ${
            input === "idCard" ? "KTP" : "Kartu Keluarga"
          } 2 MB`,
        });
      } else {
        setFormData({ ...formData, [input]: file });
        setError({ ...error, [input]: "" });
      }
    } else {
      setFormData({ ...formData, [input]: event });
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (formData["age"] < 25) {
        setError({
          ...error,
          age: "Berumur lebih dari atau sama dengan 25 tahun",
        });
      } else {
        props.onAddDataUser(formData);
        setError("");
      }
    } catch (err) {
      setError({
        ...error,
        serverError: "Terjadi kesalahan pada server. Coba lagi nanti.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      {error.serverError && (
        <p className={style.error} style={{ textAlign: "center" }}>
          {error.serverError}
        </p>
      )}
      <form onSubmit={submitHandler}>
        <InputText
          id="name"
          label="nama"
          type="text"
          value={formData["name"]}
          onChange={(event) => changeInputHandler("name", event.target.value)}
        />
        <InputText
          id="nik"
          label="NIK"
          type="number"
          value={formData["nik"]}
          onChange={(event) => changeInputHandler("nik", event.target.value)}
        />
        <InputText
          id="nokk"
          label="nomor kartu keluarga"
          type="number"
          value={formData["nokk"]}
          onChange={(event) => changeInputHandler("nokk", event.target.value)}
        />
        <InputText
          id="idcard"
          label="foto KTP"
          type="file"
          onChange={(event) => changeInputHandler("idCard", event)}
        />
        {error.idCard && <p className={style.error}>{error.idCard}</p>}
        <InputText
          id="photoKK"
          label="foto kartu keluarga"
          type="file"
          onChange={(event) => changeInputHandler("photoKK", event)}
        />
        {error.photoKK && <p className={style.error}>{error.photoKK}</p>}
        <InputText
          id="age"
          label="umur"
          type="number"
          value={formData["age"]}
          onChange={(event) => changeInputHandler("age", event.target.value)}
        />
        {error.age && <p className={style.error}>{error.age}</p>}
        <div className={style["form-control"]}>
          <label htmlFor="">Jenis Kelamin</label>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <InputRadio
              id="male"
              name="gender"
              value="Laki-Laki"
              label="Laki-Laki"
              onChange={(event) =>
                changeInputHandler("gender", event.target.value)
              }
            />
            <InputRadio
              id="female"
              name="gender"
              value="Perempuan"
              label="Perempuan"
              onChange={(event) =>
                changeInputHandler("gender", event.target.value)
              }
            />
          </div>
        </div>
        <Dropdown
          label="provinsi"
          id="province"
          value={formData["provinceId"]}
          onChange={(event) => {
            const selectedId = event.target.value;
            const selectedName =
              event.target.options[event.target.selectedIndex].text;
            setFormData((prevState) => {
              return { ...prevState, provinceId: selectedId };
            });
            setFormData((prevState) => {
              return { ...prevState, provinceName: selectedName };
            });
            regencyHandler(selectedId);
          }}
          sub="Pilih Provinsi"
          options={provinces}
        />
        <Dropdown
          label="kab/kota"
          id="regency"
          value={formData["regencyId"]}
          onChange={(event) => {
            const selectedId = event.target.value;
            const selectedName =
              event.target.options[event.target.selectedIndex].text;
            setFormData((prevState) => {
              return { ...prevState, regencyId: selectedId };
            });
            setFormData((prevState) => {
              return { ...prevState, regencyName: selectedName };
            });
            subdistrictHandler(selectedId);
          }}
          sub="Pilih Kab/Kota"
          options={regencies}
        />
        <Dropdown
          label="kecamatan"
          id="subdistrict"
          value={formData["subdistrictId"]}
          onChange={(event) => {
            const selectedId = event.target.value;
            const selectedName =
              event.target.options[event.target.selectedIndex].text;
            setFormData((prevState) => {
              return { ...prevState, subdistrictId: selectedId };
            });
            setFormData((prevState) => {
              return { ...prevState, subdistrictName: selectedName };
            });
            wardHandler(selectedId);
          }}
          sub="Pilih Kab/Kota"
          options={subdistricts}
        />
        <Dropdown
          label="kelurahan/desa"
          id="ward"
          value={formData["wardId"]}
          onChange={(event) => {
            const selectedId = event.target.value;
            const selectedName =
              event.target.options[event.target.selectedIndex].text;
            setFormData((prevState) => {
              return { ...prevState, wardId: selectedId };
            });
            setFormData((prevState) => {
              return { ...prevState, wardName: selectedName };
            });
          }}
          sub="Pilih Kelurahan/Desa"
          options={ward}
        />
        <InputText
          id="address"
          label="alamat"
          type="text"
          value={formData["address"]}
          onChange={(event) =>
            changeInputHandler("address", event.target.value)
          }
        />
        <InputText
          id="rt"
          label="RT"
          type="text"
          value={formData["rt"]}
          onChange={(event) => changeInputHandler("rt", event.target.value)}
        />
        <InputText
          id="rw"
          label="RW"
          type="text"
          value={formData["rw"]}
          onChange={(event) => changeInputHandler("rw", event.target.value)}
        />
        <InputText
          id="incomeBefore"
          label="penghasilan sebelum pandemi"
          type="number"
          value={formData["incomeBefore"]}
          onChange={(event) =>
            changeInputHandler("incomeBefore", event.target.value)
          }
        />
        <InputText
          id="incomeAfter"
          label="penghasilan setelah pandemi"
          type="number"
          value={formData["incomeAfter"]}
          onChange={(event) =>
            changeInputHandler("incomeAfter", event.target.value)
          }
        />
        <div className={style["form-control"]}>
          <label htmlFor="">alasan membutuhkan bantuan</label>
          <InputRadio
            id="lost"
            name="reason"
            value="Kehilangan pekerjaan"
            label="Kehilangan pekeraan"
            onChange={(event) =>
              changeInputHandler("reasonHelp", event.target.value)
            }
          />
          <InputRadio
            id="affected"
            name="reason"
            value="Kepala keluarga terdampak atau korban Covid-19"
            label="Kepala keluarga terdampak atau korban Covid-19"
            onChange={(event) =>
              changeInputHandler("reasonHelp", event.target.value)
            }
          />
          <InputRadio
            id="classified"
            name="reason"
            value="Tergolong fakir/miskin semenjak sebelum Covid-19"
            label="Tergolong fakir/miskin semenjak sebelum Covid-19"
            onChange={(event) =>
              changeInputHandler("reasonHelp", event.target.value)
            }
          />
          <InputRadio
            id="other"
            name="reason"
            label="Other"
            onClick={() => setOther(true)}
            onChange={(event) =>
              changeInputHandler("otherReason", event.target.value)
            }
          />
          {other && (
            <InputText
              id="otherReason"
              label="Lainnya"
              type="text"
              value={formData["otherReason"]}
              onChange={(event) =>
                changeInputHandler("otherReason", event.target.value)
              }
            />
          )}
          <div className={style.checkbox}>
            <input
              type="checkbox"
              id="check"
              checked={isChecked}
              onChange={(event) => setIsChecked(event.target.checked)}
            />
            <label htmlFor="" id="check">
              Saya menyatakan bahwa data yang diisikan adalah benar dan siap
              mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam
              data tersebut
            </label>
          </div>
          <div className={style["form-actions"]}>
            <button
              disabled={!isChecked}
              className={`${style.button} ${!isChecked && style.disable}`}
            >
              Simpan
            </button>
            {isLoading && <LoadingSpinner />}
          </div>
        </div>
      </form>
    </Card>
  );
};

export default UserInput;
