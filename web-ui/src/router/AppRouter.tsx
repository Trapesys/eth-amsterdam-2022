import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layouts/AppLayout';
import AllQuestionsWrap from '../components/molecules/AllQuestionsWrap/AllQuestions';
import Homepage from '../components/organisms/Homepage/Homepage';
import NewQuestion from '../components/organisms/NewQuestion/NewQuestion';
import QuestionPage from '../components/organisms/QuestionPage/QuestionPage';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<Homepage />}>
          <Route path={'/'} element={<AllQuestionsWrap />} />
          <Route path={'/question/:contentID'} element={<QuestionPage />} />
        </Route>
        <Route path={'/new'} element={<NewQuestion />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
