import React from "react";
import { SelectProfileContainer } from "./profiles";
import { FirebaseContext } from "../context/firebase";
import { useContext, useEffect, useState } from "react/cjs/react.development";
import { getAuth } from "firebase/auth";
import {Loading, Header, Card} from '../compoments';
import * as ROUTES from '../constants/routes';
import logo from "../logo.png";


export function BrowseContainer({slides}){
    const [category, setCategory] = useState('series');
    const [ searchTerm, setSearchTerm] = useState('');
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const {firebase} = useContext(FirebaseContext);
    const user = getAuth(firebase).currentUser || {};
    const [slideRows, setSlideRows] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [profile.displayName]);

    useEffect(() => {
        setSlideRows(slides[category]);
    },[]);

    return profile.displayName ? (

        <>
        {loading ? (
            <Loading src={user.photoURL} />
            ) : (
                <Loading.ReleaseBody/>
            )}
            <Header src="joker1">
                <Header.Frame>
                    <Header.Group>
                        <Header.Logo to={ROUTES.HOME} src={logo} alt="IndianMovies" />
                        <Header.TextLink>Series</Header.TextLink>
                        <Header.TextLink>Films</Header.TextLink>
                    </Header.Group>
                    <Header.Group>
                        <Header.Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                        <Header.Profile>
                            <Header.Picture src={user.photoURL}/>
                            <Header.Dropdown>
                                <Header.Group>
                                    <Header.Picture src={user.photoURL}/>
                                    <Header.TextLink>{user.displayName}</Header.TextLink>
                                </Header.Group>
                                <Header.Group>
                                    <Header.TextLink onClick = {() => getAuth(firebase).signOut()}>Sign out</Header.TextLink>
                                </Header.Group>
                            </Header.Dropdown>
                        </Header.Profile>
                    </Header.Group>
                </Header.Frame>
                <Header.Feature>
                <Header.FeatureCallOut>Watch Joker Now</Header.FeatureCallOut>
                <Header.Text>
                    Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he walks the streets of Gotham 
                    City. Arthur wears two masks -- the one he paints for his day job as a clown, and the guise he projects in a 
                    futile attempt to feel like he's part of the world around him.
                    </Header.Text>
                    <Header.PlayButton>Play</Header.PlayButton>
                </Header.Feature>
            </Header>
            <Card.Group>

            </Card.Group>
            </>
    ) : (
        <SelectProfileContainer user={user} setProfile={setProfile}/>
    );
}