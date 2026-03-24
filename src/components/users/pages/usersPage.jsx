//MODULES
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import UsersTable from "../userTable";
import AddUser from "../actions/addUser";
import CloseI from "../../../assets/icon/close";
import CustomInput from "../../common/customInput";
import CustomPagination from "../../common/pagination";
import TableSkeleton from "../../common/tableSkeleton";
import UsersFilter from "../usersFilter";
import { usePopup } from "../../../context/PopupContext";

//REDUX
import {
  getUsers,
  resetGetUsersState,
} from "../../../redux/users/getUsersSlice";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { loading, success, error, users } = useSelector(
    (state) => state.users.getUsers,
  );

  const [searchVal, setSearchVal] = useState("");
  const [usersData, setUsersData] = useState(null);
  const [filter, setFilter] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = import.meta.env.VITE_ROWS_PER_PAGE;

  const [totalItems, setTotalItems] = useState(null);
  // const lastItemIndex = pageNumber * itemsPerPage;
  // const firstItemIndex = lastItemIndex - itemsPerPage;
  //const currentItems = usersData?.slice(firstItemIndex, lastItemIndex);

  function clearSearch() {
    setSearchVal("");
    dispatch(
      getUsers({
        pageNumber,
        pageSize: itemsPerPage,
        searchKey: null,
        active: filter?.active?.value,
        verify: filter?.verify?.value,
        role: filter?.role?.value,
      }),
    );
  }

  function handleSearch(e) {
    e.preventDefault();
    if (!searchVal) return;
    dispatch(
      getUsers({
        pageNumber: 1,
        searchKey: searchVal,
        pageSize: itemsPerPage,
        active: filter?.active?.value,
        verify: filter?.verify?.value,
        role: filter?.role?.value,
      }),
    );
    setPageNumber(1);
  }

  const handleFilter = (bool) => {
    if (bool) {
      setOpenFilter(false);
      setPageNumber(1);
      dispatch(
        getUsers({
          pageNumber: 1,
          searchKey: searchVal,
          pageSize: itemsPerPage,
          active: filter?.active?.value,
          verify: filter?.verify?.value,
          role: filter?.role?.value,
        }),
      );
    } else {
      if (filter) {
        dispatch(
          getUsers({
            pageNumber,
            pageSize: itemsPerPage,
            searchKey: searchVal,
            active: null,
            verify: null,
            role: null,
          }),
        );
      }
      setFilter(null);
      setOpenFilter(false);
    }
  };

  const handlePageChange = (number) => {
    dispatch(
      getUsers({
        pageNumber: number,
        pageSize: itemsPerPage,
        searchKey: searchVal,
        active: filter?.active?.value,
        verify: filter?.verify?.value,
        role: filter?.role?.value,
      }),
    );
  };

  // GET USERS
  useEffect(() => {
    if (!usersData) {
      dispatch(
        getUsers({
          page: pageNumber,
          pageSize: itemsPerPage,
          searchKey: searchVal,
          active: null,
          verify: null,
          role: null,
        }),
      );
    }
  }, [usersData]);

  // TOAST AND SET USERS
  useEffect(() => {
    if (error) {
      dispatch(resetGetUsersState());
    }

    if (success) {
      setUsersData(users?.data);
      setTotalItems(users?.totalCount);
      dispatch(resetGetUsersState());
    }
  }, [loading, success, error, users]);

  //HIDE POPUP
  const { contentRef, setContentRef, setPopupContent } = usePopup();
  const usersFilterRef = useRef();
  useEffect(() => {
    if (usersFilterRef) {
      const refs = contentRef.filter((ref) => ref.id !== "usersFilter");
      setContentRef([
        ...refs,
        {
          id: "usersFilter",
          outRef: null,
          ref: usersFilterRef,
          callback: () => setOpenFilter(false),
        },
      ]);
    }
  }, [usersFilterRef]);

  return (
    <section className="lg:ml-[280px] pt-16 px-[4%] pb-4 grid grid-cols-1 section_row">
      {/* TITLE */}
      <div className="w-full text-[--black-2] text-2xl font-semibold pt-2">
        <h2>Kullanıcılar</h2>
      </div>

      {/* ACTIONS/BUTTONS */}
      <div className="w-full flex justify-between items-end mb-6 flex-wrap gap-2">
        <div className="flex items-center w-full max-w-sm max-sm:order-2">
          <form className="w-full" onSubmit={(e) => handleSearch(e)}>
            <CustomInput
              onChange={(e) => {
                setSearchVal(e);
                !e && clearSearch();
              }}
              value={searchVal}
              placeholder="Ara..."
              className2="mt-[0px] w-full mt-[0] sm:mt-[0]"
              className="mt-[0px] py-[.7rem] w-[100%] focus:outline-none"
              icon={<CloseI className="w-4 text-[--red-1]" />}
              className4={`hover:bg-[--light-4] rounded-full px-2 py-1 ${
                searchVal ? "block" : "hidden"
              }`}
              iconClick={clearSearch}
            />
          </form>
        </div>

        <div className="max-sm:w-full flex justify-end">
          <div className="flex gap-2 max-sm:order-1 " ref={usersFilterRef}>
            <UsersFilter
              openFilter={openFilter}
              setOpenFilter={setOpenFilter}
              filter={filter}
              setFilter={setFilter}
              handleFilter={handleFilter}
            />

            <div>
              <button
                className="h-11 whitespace-nowrap text-[--primary-2] px-3 rounded-md text-sm font-normal border-[1.5px] border-solid border-[--primary-2]"
                onClick={() => {
                  setPopupContent(
                    <AddUser onSuccess={() => handleFilter(true)} />,
                  );
                }}
              >
                Kullanıcı Ekle
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      {usersData ? (
        <UsersTable
          users={usersData}
          itemsPerPage={itemsPerPage}
          onSuccess={() => handleFilter(true)}
        />
      ) : loading ? (
        <TableSkeleton />
      ) : null}

      {/* PAGINATION */}
      {usersData && typeof totalItems === "number" && (
        <div className="w-full self-end flex justify-center pt-2 text-[--black-2]">
          <CustomPagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
};

export default UsersPage;
