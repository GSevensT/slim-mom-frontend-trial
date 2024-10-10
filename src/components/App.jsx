import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect, lazy } from "react"; // missing useContext\
//add loader
import { getToken } from "redux/authSelectors";
import { useGetUserQuery } from "redux/auth";
import { setCurrentUser } from "redux/authSlice";

 //add imports 

const Diary = lazy (() => import('../pages/DiaryPage'));

export const App = () => {
    const dailyRate = useSelector(state => state.auth.userInfo.dailyRate);

    const dispatch = useDispatch();
    const token = useSelector(getToken);
  
    const mockQuery = '';
    const { data } = useGetUserQuery(mockQuery, { skip: !token });
  
    useEffect(() => {
      if (!data) {
        return;
      }
      if (dailyRate) {
        return;
      }
  
      dispatch(setCurrentUser(data));
    }, [dailyRate, data, dispatch]);

    return (
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route
                  path="diary"
                  element={
                    <PrivateRoute>
                      <Diary />
                    </PrivateRoute>
                  }
                />
                <Route path="/*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
      );
      
};
