// 여기를 redirection 페이지로 설정하고 (카카오에서) 여기다가 쿼리 파람 확딘하고 해야함
//   const tokenData = useManageKakaoLogin();
//   if (tokenData) {
//     const { data: responseData, error, isLoading } = useGetKakaoUserData(tokenData);

//     useEffect(() => {
//       if (responseData) {
//         console.log(responseData);
//         // const { profile_nickname, profile_image, account_email } = responseData;
//         // console.log(profile_image, profile_nickname, account_email);
//         // 백엔드로 전달
//       }
//       if (error) {
//         console.error('Error fetching user data:', error);
//       }
//     }, [responseData, error]);
