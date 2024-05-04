
const availablePlacesMock: Record<string, number> = {
    'Селф': 19,
    'З Вчителем': 7,
    'З Олександрою': 3,
}

export const getAvailablePlaces = (name: string, places: number) => {
    const fakePlaces = availablePlacesMock[name];
    return places < fakePlaces ? places : fakePlaces;
}