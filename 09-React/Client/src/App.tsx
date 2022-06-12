import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';

import { Routes } from './routes/routes';

import Offers from './pages/Offers/Offers';
import CreateOffer from './pages/CreateOffer/CreateOffer';
import Login from './pages/Login/Login';
import MyOffers from './pages/MyOffers/MyOffers';
import Register from './pages/Register/Register';
import Offer from './pages/Offer/Offer';
import MainWrapper from './components/layout/MainWrapper/MainWrapper';
import UserProvider from './components/common/context/UserProvider';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />

        <MainWrapper>
          <Switch>
            <Route path={Routes.offers.pattern} component={Offers} />
            <Route path={Routes.createOffer.pattern} component={CreateOffer} />
            <Route path={Routes.login.pattern} component={Login} />
            <Route path={Routes.myOffers.pattern} component={MyOffers} />
            <Route path={Routes.register.pattern} component={Register} />
            <Route path={Routes.offer.pattern} component={Offer} />
          </Switch>
        </MainWrapper>

        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
