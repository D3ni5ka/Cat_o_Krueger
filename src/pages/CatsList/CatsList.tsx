import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CatCard from "../../components/CatCard";
import Paginator from "../../components/Paginator";
import Spinner from "../../components/Spinner";
import { request } from "../../utils";
import styles from "./CatsList.module.scss";
import Select, { Option } from "../../components/Select/Select";
import logo from "../../components/logo.png";
import ErrorIndicator from "../../components/ErrorEndicator/Error-Indicator";
import MyLoader from "../../components/MyLoader/Spinner/MyLoader";

const options = [
  {
    text: "16",
    value: 16,
  },
  {
    text: "24",
    value: 24,
  },
  {
    text: "36",
    value: 36,
  },
];

const defaultOptionBreeds = { text: "Select a cat breed", value: "" };
const defaultOptionCategory = { text: "Select a cat category", value: "" };

const CatsList: React.FC = () => {
  const [images, setImages] = useState([]); // пустой массив картинок
  const [pages, setPages] = useState(0); // текущая страница
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "0";
  const categoryId = searchParams.get("categoryId") || "";
  const [loading, setLoading] = useState(false);
  // const [perPage, setPerPage] = useState(DEFAULT_IMAGE_NUMBER);
  const perPage = searchParams.get("perPage") || "24";
  const [category, setCategory] = useState<Option[]>([]);
  const [breeds, setBreeds] = useState<Option[]>([]);
  const breedId = searchParams.get("breedId") || "";

  useEffect(() => {
    const fetchMyAPI = async () => {
      setLoading(false);
      const apiRequest = await request("images/search", {
        query: new URLSearchParams({
          limit: `${perPage}`,
          page,
          order: "asc",
          category_ids: categoryId,
          breed_ids: breedId,
        }).toString(),
      });
      setLoading(true);

      const responseImages = await apiRequest.json();
      const totalImages = apiRequest.headers.get("Pagination-Count");
      // console.log(responseImages);
      setPages(Math.ceil(Number(totalImages) / Number(perPage)) - 1);
      setImages(responseImages);
    };

    fetchMyAPI();
  }, [page, perPage, categoryId, breedId]);

  useEffect(() => {
    const fetchCategory = async () => {
      const apiRequestCategory = await request("categories");
      const responseCategory = await apiRequestCategory.json();

      const categoryOptions = responseCategory.map((item: any) => {
        return {
          text: item.name,
          value: item.id,
        };
      });
      setCategory([defaultOptionCategory, ...categoryOptions]);
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchBreed = async () => {
      const apiRequestBreed = await request("breeds");
      const responseBreed = await apiRequestBreed.json();

      const breedOptions = responseBreed.map((item: any) => {
        return {
          text: item.name,
          value: item.id,
        };
      });
      setBreeds([defaultOptionBreeds, ...breedOptions]);
    };
    fetchBreed();
  }, []);

  console.log(breeds);

  function onPageClick(currentPage: number) {
    setSearchParams({ page: String(currentPage - 1) });
  } // функция которая изменяет url, а именно страницу

  function onChangeSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    // setPerPage(Number(event.target.value));
    setSearchParams({ perPage: event.target.value });
  }

  function onCategorySelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setSearchParams({ categoryId: event.target.value, breedId });
  }

  function onBreedsSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log(event.target.value);
    setSearchParams({ breedId: event.target.value, categoryId });
  }

  const listImages = images.map(({ url, id }) => {
    return <CatCard url={url} key={id} />;
  });

  // const listSkeleton = [...Array(images.length)].map((item) => {
  //   return <MyLoader />;
  // });   // skeleton

  return (
    <>
      <header className={styles.header}>
        <a href="#">
          <img src={logo} alt="logo" />
        </a>

        <div className={styles.menu}>
          <Select
            onChangeSelect={onChangeSelect}
            value={perPage}
            options={options}
          />

          <Select
            options={category}
            value={categoryId}
            onChangeSelect={onCategorySelect}
            defaultValue=""
          />

          <Select
            options={breeds}
            value={breedId}
            onChangeSelect={onBreedsSelect}
            defaultValue=""
          />
        </div>
      </header>

      <div className={styles.container}>
        {loading ? listImages : <Spinner />}
      </div>

      {images.length === 0 ? <ErrorIndicator /> : null}

      <Paginator
        currentPage={Number(page)}
        totalPages={pages}
        onPageClick={onPageClick}
      />
    </>
  );
};

export default CatsList;
