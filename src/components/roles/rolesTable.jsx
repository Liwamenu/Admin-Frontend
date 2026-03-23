import Actions from "./actions/actions";

const RolesTable = ({ roles, onSuccess }) => {
  return (
    <main className="max-xl:overflow-x-scroll">
      <div className="min-h-[30rem] border border-solid border-[--light-4] rounded-lg min-w-[70rem] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[--light-3] h-8 text-left text-[--black-1] whitespace-nowrap">
              <th className="pl-4 font-normal">Rol Adı</th>
              <th className="font-normal">Açıklama</th>
              <th className="font-normal">Sistem Rolü</th>
              <th className="font-normal">Aktif</th>
              <th className="font-normal">İzin Sayısı</th>
              <th className="font-normal text-center">İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {roles.map((role, index) => (
              <tr
                key={role.id}
                className={`font-light odd:bg-[--white-1] even:bg-[--table-odd] h-14 border border-solid border-[--light-4] border-x-0 hover:bg-[--light-3] transition-colors ${
                  roles.length < 8 ? "" : "last:border-b-0"
                }`}
              >
                <td className="whitespace-nowrap text-[--black-2] pl-4 font-semibold">
                  {role.role}
                </td>
                <td className="whitespace-nowrap text-[--black-2]">
                  {role.description || "-"}
                </td>
                <td className="whitespace-nowrap text-[--black-2]">
                  {role.isSystemRole ? (
                    <span className="px-2 py-1 bg-[--light-1] rounded text-xs">
                      Evet
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-[--white-1] bg-[--gr-1] rounded text-xs">
                      Hayır
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap text-[--black-2]">
                  {role.isActive ? (
                    <span className="px-2 py-1 bg-[--status-green] rounded text-xs text-[--green-1]">
                      Aktif
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-[--status-red] rounded text-xs text-[--red-1]">
                      Pasif
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap text-[--black-2]">
                  {role.permissions?.length || 0}
                </td>
                <td className="w-24 text-[--black-2] font-light text-center">
                  <div className="flex gap-2 justify-center relative">
                    {!role.isSystemRole && (
                      <Actions
                        index={index}
                        role={role}
                        itemsPerPage={roles.length || 1}
                        onSuccess={onSuccess}
                      />
                    )}
                    {role.isSystemRole && (
                      <span className="text-xs text-[--black-2] opacity-60">
                        Sistem Rolü
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default RolesTable;
