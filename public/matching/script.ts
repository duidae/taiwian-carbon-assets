const locations = [
{lat: 24.93646945	, lng: 121.1875529},
{lat: 25.03081834	, lng: 121.53548},
{lat: 23.91303586	, lng: 120.6854227},
{lat: 23.94747191	, lng: 121.545058},
{lat: 22.68289766	, lng: 120.505496},
{lat: 23.98985608	, lng: 121.6331172},
{lat: 22.97980571	, lng: 120.2214865},
{lat: 22.99778474	, lng: 120.2530932},
{lat: 24.41682428	, lng: 118.3277435},
{lat: 25.0265047	, lng: 121.5343036},
{lat: 23.94837024	, lng: 121.5475111},
{lat: 23.94954194	, lng: 121.5236205},
{lat: 23.90468423	, lng: 121.602381},
{lat: 23.95132381	, lng: 121.546658},
{lat: 23.15796405	, lng: 120.0761312},
{lat: 22.92122911	, lng: 120.2297406},
{lat: 25.02033124	, lng: 121.5377155},
{lat: 23.89517989	, lng: 121.5440307},
{lat: 23.94694439	, lng: 121.5272781},
{lat: 24.93431669	, lng: 121.2608799},
{lat: 25.03017228	, lng: 121.5358672},
{lat: 23.95230588	, lng: 121.5839837},
{lat: 23.94644832	, lng: 121.5497265},
{lat: 25.01282977	, lng: 121.5506057},
{lat: 23.92439651	, lng: 121.5230076},
{lat: 23.82438925	, lng: 121.5616015},
{lat: 25.01544109	, lng: 121.5402565},
{lat: 23.86196952	, lng: 121.5217575},
{lat: 23.95284753	, lng: 121.5471},
{lat: 25.02801737	, lng: 121.5279816},
{lat: 25.15425772	, lng: 121.4059414},
{lat: 23.75242781	, lng: 121.467787},
{lat: 23.8975679	, lng: 121.5417911},
{lat: 25.01743768	, lng: 121.539773},
{lat: 25.03912535	, lng: 121.5398477},
{lat: 23.85880711	, lng: 121.4863689},
{lat: 25.03207289	, lng: 121.5450084},
{lat: 23.98397576	, lng: 121.5934036}
];

locations.forEach((location, index) => {
    const json = `{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [${location.lng}, ${location.lat}]
        },
        "properties": {
            "caseID": ${index + 1}
        }
    },`;
    console.log(json);
});
