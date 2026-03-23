//MOD
import { useState } from "react";

//COMP
import EditAdminProfile from "./pages/editAdminProfile";
import EditAdminPassword from "./pages/editAdminPassword";

//VAR
const tabs = ["Profili Düzenle", "Güvenlik"];

const ProfilePage = () => {
  const [selected, setSelected] = useState(0);

  return (
    <section className="lg:ml-[280px] pt-16 sm:pt-16 px-[4%] pb-4 flex flex-col">
      <div className="w-full text-[--black-2] py-8 text-2xl font-bold">
        <h2>Profil</h2>
      </div>

      <nav className="flex flex-col items-start w-full border-b border-[--border-1] max-w-[1050px]">
        <div className="flex flex-col w-max">
          <ul className="w-full flex gap-10 max-sm:gap-4 items-center px-4 text-base text-slate-500">
            {tabs.map((tab, index) => (
              <li
                key={index}
                className={`cursor-pointer w-32 ${
                  selected === index ? "text-[--primary-1]" : ""
                }`}
                onClick={() => setSelected(index)}
              >
                {tab}
              </li>
            ))}
          </ul>

          <div className="flex mt-2 w-full">
            <div
              className={`bg-[--primary-1] rounded-t-xl h-[3px] w-[8.6rem] transition-transform duration-500 ease-in-out ${
                selected === 1 && "translate-x-[8rem] sm:translate-x-[9.7rem]"
              }`}
            />
          </div>
        </div>
      </nav>

      {selected === 0 ? (
        <EditAdminProfile />
      ) : selected === 1 ? (
        <EditAdminPassword />
      ) : (
        ""
      )}
    </section>
  );
};

export default ProfilePage;
