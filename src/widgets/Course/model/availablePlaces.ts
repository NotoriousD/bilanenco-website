
const availablePlacesMock: Record<string, number> = {
    'Селф': 12,
    'З вчителем': 7,
    'З Олександрою': 2,
}

export const getAvailablePlaces = (name: string, places: number) => {
    const fakePlaces = availablePlacesMock[name];
    return places < fakePlaces ? places : fakePlaces;
}