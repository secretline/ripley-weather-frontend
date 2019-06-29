import React from "react";
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Map from '../../../components/Map'

configure({adapter: new Adapter()});

describe("Map component", () => {
    test("center should be specified", () => {
        try {
            shallow(<Map google={undefined}
                         center={null}
                         height={0}
                         zoom={1}
                         apiKey={'-'}/>);
        } catch (e) {
            expect(e.message).toBe("Cannot read property 'lat' of null")
        }
    });
});
