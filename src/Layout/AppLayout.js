import React from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import { Switch, Redirect } from 'react-router-dom';

const Counter = React.lazy(() => import('../Components/Counter/Counter.js'));
const Home = React.lazy(() => import('../Components/Home.js'));

class AppLayout extends React.Component {

    render() {
        return (
            <div>

                <Header />
                <Switch>
                    <Counter exact path="/counter" component={Counter} />
                    <Home exact path="/home" component={Home} />
                    <Redirect exact from="/*" to="/home" />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default AppLayout;