import { useEffect } from "react";
import {
  Utensils,
  CreditCard,
  Calendar,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Clock,
  DollarSign,
} from "lucide-react";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminSummary } from "../../../redux/statistics/getAdminSummarySlice";

const DashboardPage = () => {
  const dispatch = useDispatch();

  const { summary } = useSelector((state) => state.statistics.getAdminSummary);
  const summaryData = summary?.data || {};

  const totalRestaurants = summaryData.totalRestaurants ?? 0;
  const activeLicenses = summaryData.activeLicenses ?? 0;
  const expiredLicenses = summaryData.expiredLicenses ?? 0;
  const totalOrders = summaryData.totalOrders ?? 0;
  const totalReservations = summaryData.totalReservations ?? 0;
  const totalPayments = summaryData.totalPayments ?? 0;
  const successfulPaymentsAmount = summaryData.successfulPaymentsAmount ?? 0;
  const waitingBankTransferPayments =
    summaryData.waitingBankTransferPayments ?? 0;

  useEffect(() => {
    dispatch(getAdminSummary());
  }, [dispatch]);

  return (
    <section className="lg:ml-[280px] pt-16 sm:pt-16 px-[4%] pb-4 grid grid-cols-1 section_row">
      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="w-full text-[--black-2] py-4 text-2xl font-semibold">
          <h2>
            Gösterge <span className="text-[--primary-1]">Paneli</span>
          </h2>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Toplam Restoran"
            value={totalRestaurants}
            icon={<Utensils className="text-[--primary-1]" />}
            glowClass="bg-[--primary-1]"
          />
          <StatCard
            title="Aktif Lisans"
            value={activeLicenses}
            icon={<CheckCircle2 className="text-[--green-1]" />}
            glowClass="bg-[--green-1]"
          />
          <StatCard
            title="Süresi Dolan Lisans"
            value={expiredLicenses}
            icon={<AlertCircle className="text-[--red-1]" />}
            glowClass="bg-[--red-1]"
          />
          <StatCard
            title="Toplam Ciro"
            value={`${successfulPaymentsAmount.toLocaleString()}`}
            icon={<DollarSign className="text-[--yellow-1]" />}
            glowClass="bg-[--yellow-1]"
          />
        </div>

        {/* Middle Section: Orders & Reservations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-[--white-1] border border-[--border-1] rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-lg text-[--black-1] uppercase tracking-wide">
                Aktivite Ozeti
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4 border border-[--border-1] rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[--status-primary-1] rounded-lg">
                      <ShoppingBag size={18} className="text-[--primary-1]" />
                    </div>
                    <span className="text-[--black-2] font-medium">
                      Toplam Siparis
                    </span>
                  </div>
                  <span className="text-[--black-1] font-bold text-xl">
                    {totalOrders}
                  </span>
                </div>
              </div>

              <div className="space-y-4 border border-[--border-1] rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[--status-purple] rounded-lg">
                      <Calendar size={18} className="text-[--purple-1]" />
                    </div>
                    <span className="text-[--black-2] font-medium">
                      Rezervasyon
                    </span>
                  </div>
                  <span className="text-[--black-1] font-bold text-xl">
                    {totalReservations}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Payments Sidebar */}
          <div className="bg-[--white-1] border border-[--border-1] rounded-3xl p-6 shadow-sm flex flex-col">
            <h2 className="text-lg text-[--black-1] uppercase tracking-wide mb-6">
              Ödeme Durumu
            </h2>

            <div className="flex-1 space-y-6">
              <div className="p-4 bg-[--status-green] rounded-2xl border border-[--green-1]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[--black-3] text-sm">
                    Başarılı Toplam Ödeme
                  </span>
                  <CreditCard size={16} className="text-[--black-3]" />
                </div>
                <p className="text-2xl font-bold text-[--black-1]">
                  {totalPayments}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[--status-orange] border border-[--orange-1]">
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-[--orange-1] fade" />
                    <span className="text-[--black-2] text-sm font-medium">
                      Bekleyen Banka Havalesi
                    </span>
                  </div>
                  <span className="px-2 py-0.5 bg-[--orange-1] text-white text-xs font-bold rounded-md">
                    {waitingBankTransferPayments}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
export default DashboardPage;

function StatCard({ title, value, icon, glowClass }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-[--white-1] border border-[--border-1] p-6 rounded-3xl shadow-sm relative overflow-hidden group"
    >
      <div className="relative z-10">
        <div className="mb-4 p-3 bg-[--white-2] rounded-2xl w-fit border border-[--border-1] group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <p className="text-[--black-3] text-xs uppercase tracking-widest font-bold mb-1">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-[--black-1]">{value}</h3>
      </div>

      {/* Decorative background element */}
      <div
        className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-5 blur-2xl ${glowClass}`}
      />
    </motion.div>
  );
}
