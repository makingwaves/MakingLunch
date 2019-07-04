import {LunchDto} from "@app/api/lunchesService/lunchesService";
import {Location, Lunch, TimeSpan} from "@app/state/lunches/types";

export function normalizeLunch(lunchDto: LunchDto): Lunch {
    const locations = lunchDto.lunchRequests.reduce<{[key:string]:Location}>((prev, current) => {
        prev[current.user.id] = {
            latitude: current.latitude,
            longitude: current.longitude,
            radiusInMeters: current.radiusInMeters
        };

        return prev;
    }, {});

    const times = lunchDto.lunchRequests.reduce<{[key:string]:TimeSpan}>((prev, current) => {
        prev[current.user.id] = {
            begin: current.begin,
            end: current.end
        };

        return prev;
    }, {});
    const members = lunchDto.lunchRequests.map(lunchRequest => lunchRequest.user.id);

    return {
        id: lunchDto.id,
        status: lunchDto.status,
        locations: locations,
        times: times,
        members: members,
    }
}