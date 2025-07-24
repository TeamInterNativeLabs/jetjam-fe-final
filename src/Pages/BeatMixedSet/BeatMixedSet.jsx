import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EmptyComponent from "../../Components/EmptyComponent";
import { SiteSelect } from "../../Components/Input/select";
import { UserLayout } from "../../Components/Layout";
import Loader from "../../Components/Loader";
import { useGetAlbumsQuery } from "../../Redux/Services/Album";
import SongCard from "../Home/TrendingDanceAndFitness/SongCard";
import "./index.css";
import SiteInput from "../../Components/Input/input";
import useDebounce from "../../Hooks/useDebounce";
import { useLocation } from "react-router";

const statusOptions = [
  {
    id: 12123,
    value: "",
    option: "All",
  },
];

const BeatMixedSet = () => {
  const { state } = useLocation();

  const [genre, setGenre] = useState("");
  const [length, setLength] = useState("");
  const [bpm, setBpm] = useState("");
  const [search, debounceSearch, onChangeSearch] = useDebounce();
  const [page, setPage] = useState(1);
  const maxcards = 20;

  const { general } = useSelector((state) => state.generalSlice);
  const { data, isFetching: isLoading } = useGetAlbumsQuery({
    genre,
    length,
    bpm,
    search: debounceSearch,
  });

  useEffect(() => {
    setGenre(state?.genre_id ?? "");
  }, [state]);

  return (
    <UserLayout>
      <section className="beat-mixed-set">
        <Loader loading={isLoading} />
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-11 col-12">
              <h4>All Sets</h4>
              <div className="d-flex align-items-center justify-content-end gap-3 flex-wrap my-3">
                <div className="flex-grow-1">
                  <SiteInput
                    labelClass="d-block"
                    label="Search"
                    placeholder="Search here..."
                    value={search}
                    onChange={onChangeSearch}
                  />
                </div>
                <div className="flex-shrink-0">
                  <SiteSelect
                    items={[
                      ...statusOptions,
                      ...(general?.lengths
                        ? general?.lengths?.map((item, index) => ({
                            id: index,
                            value: item?.value,
                            option: item?.label,
                          }))
                        : []),
                    ]}
                    label="Filter by Length"
                    value={length}
                    onChange={setLength}
                  />
                </div>
                <div className="flex-shrink-0">
                  <SiteSelect
                    items={[
                      ...statusOptions,
                      ...(general?.bpm
                        ? general?.bpm?.map((item, index) => ({
                            id: index,
                            value: item?.value,
                            option: item?.label,
                          }))
                        : []),
                    ]}
                    label="Filter by BPM"
                    value={bpm}
                    onChange={setBpm}
                  />
                </div>
                <div className="flex-shrink-0">
                  <SiteSelect
                    items={[
                      ...statusOptions,
                      ...(general?.genres
                        ? general?.genres?.map((item) => ({
                            id: item?._id,
                            value: item?._id,
                            option: item?.name,
                          }))
                        : []),
                    ]}
                    label="Filter by Genre"
                    value={genre}
                    onChange={setGenre}
                  />
                </div>
              </div>
              <div className="row">
                {data?.data?.length <= 0 ? (
                  <EmptyComponent />
                ) : (
                  data?.data?.map((item) => (
                    <div
                      className="col-lg-3 col-sm-6 col-md-4 my-3"
                      key={item._id}
                    >
                      <SongCard data={item} size="md" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default BeatMixedSet;
