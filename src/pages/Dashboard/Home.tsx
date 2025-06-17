import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLazyGetCategoriesQuery } from '@/services/dashboardApi';
import { RootState } from '../../store/store';
import { Navigate } from "react-router-dom";

import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  const token = useSelector((state: RootState) => state.auth.token);
  const [triggerGetCategories, { data, isLoading }] = useLazyGetCategoriesQuery();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const res = await triggerGetCategories()?.unwrap();
          console.log('Success:', res);
          setCategories(res);
          // your custom success logic here
        } catch (err) {
          console.error('Failed to fetch:', err);
          // your custom error handling here
        }
      };
    
      fetchData();
    }
  }, [token, triggerGetCategories]);
  
  // Redirect to login if not authenticated
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          {/* <EcommerceMetrics /> */}
          {categories.length > 0 && (
            <div>
              {categories.map((item) => (
                <div key={item.id} className="mb-4 p-4 border rounded">
                  <h3 className="text-lg font-semibold">{item.name}</h3>

                  {item.data ? (
                    <ul className="ml-4 list-disc">
                      {Object.entries(item.data).map(([key, value]) => (
                        <li key={key}>
                          <strong>{key}:</strong> {String(value)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No data available</p>
                  )}
                </div>
              ))}
            </div>
          )}

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
