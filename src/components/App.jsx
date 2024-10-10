

//add imports 

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
