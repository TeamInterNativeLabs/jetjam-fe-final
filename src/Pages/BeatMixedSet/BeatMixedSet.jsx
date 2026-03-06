import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EmptyComponent from "../../Components/EmptyComponent";
import { SiteSelect } from "../../Components/Input/select";
import { UserLayout } from "../../Components/Layout";
import Loader from "../../Components/Loader";
import SongCard from "../Home/TrendingDanceAndFitness/SongCard";
import "./index.css";
import SiteInput from "../../Components/Input/input";
import useDebounce from "../../Hooks/useDebounce";
import { useLocation } from "react-router";
import { getApiBaseUrl } from "../../Config/env";

const statusOptions = [
  {
    id: 12123,
    value: "",
    option: "All",
  },
];

const BeatMixedSet = () => {
  const { state } = useLocation();
  const { general } = useSelector((state) => state.generalSlice);

  const [genre, setGenre] = useState("");
  const [length, setLength] = useState("");
  const [bpm, setBpm] = useState("");
  const [data, setData] = useState(null);
  const [search, debounceSearch, onChangeSearch] = useDebounce();
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const maxcards = 10;

  // Set genre from router state
  useEffect(() => {
    if (state?.genre_id) {
      setGenre(state.genre_id);
    }
  }, [state]);

  // Reset page when filters/search change
  useEffect(() => {
    setPage(1);
  }, [genre, length, bpm, debounceSearch]);

  // Fetch data on mount and when filters/search/page change
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        let url = `${getApiBaseUrl()}/album/get?`;
        const params = new URLSearchParams();

        if (genre) params.append("genre", genre);
        if (length) params.append("length", length);
        if (bpm) params.append("bpm", bpm);
        if (debounceSearch) params.append("search", debounceSearch);
        if (page) params.append("page", page);
        params.append("rowsPerPage", maxcards);

        const response = await fetch(`${url}${params.toString()}`);
        const json = await response.json();

        setData(json);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [genre, length, bpm, debounceSearch, page]);

  const totalCount = data?.total ?? 0;
  const totalPages = Math.ceil(totalCount / maxcards);
  const songs = data?.data ?? [];

  const isFilterDataReady =
    general?.genres?.length && general?.bpm?.length && general?.lengths?.length;

  if (!isFilterDataReady) {
    return <Loader loading={true} />;
  }

  return (
    <UserLayout>
      <section className="beat-mixed-set">
        <Loader loading={isLoading} />
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-11 col-12">
              <h4>All Sets</h4>

              {/* Filters */}
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
                <div className="flex-grow-1">
                  <SiteSelect
                    items={[
                      ...statusOptions,
                      ...general.lengths.map((item, index) => ({
                        id: index,
                        value: item?.value,
                        option: item?.label,
                      })),
                    ]}
                    label="Filter by Length"
                    value={length}
                    onChange={(e) => setLength(e?.target?.value ?? "")}
                  />
                </div>
                <div className="flex-grow-1">
                  <SiteSelect
                    items={[
                      ...statusOptions,
                      ...general.bpm.map((item, index) => ({
                        id: index,
                        value: item?.value,
                        option: item?.label,
                      })),
                    ]}
                    label="Filter by BPM"
                    value={bpm}
                    onChange={(e) => setBpm(e?.target?.value ?? "")}
                  />
                </div>
                <div className="flex-grow-1">
                  <SiteSelect
                    items={[
                      ...statusOptions,
                      ...general.genres.map((item) => ({
                        id: item?._id,
                        value: item?._id,
                        option: item?.name,
                      })),
                    ]}
                    label="Filter by Genre"
                    value={genre}
                    onChange={(e) => setGenre(e?.target?.value ?? "")}
                  />
                </div>
              </div>

              {/* Song Cards */}
              <div className="row">
                {songs.length > 0 ? (
                  songs.map((item) => (
                    <div
                      className="col-lg-3 col-sm-6 col-md-4 my-3"
                      key={item._id}
                    >
                      <SongCard data={item} size="md" />
                    </div>
                  ))
                ) : (
                  <EmptyComponent />
                )}
              </div>

              {/* Pagination */}
              {!isLoading && totalPages > 1 && (
                <div className="d-flex justify-content-center align-items-center my-4 gap-3">
                  <button
                    className="pagination-btn"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                  >
                    Prev
                  </button>
                  <span>
                    Page {page} of {totalPages}
                  </span>
                  <button
                    className="pagination-btn"
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={page === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default BeatMixedSet;
