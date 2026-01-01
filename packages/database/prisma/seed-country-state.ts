
import * as fs from 'fs';
import { PrismaClient } from '@prisma/client';
// import 'dotenv/config';

const client = new PrismaClient();

const loadData = async () => {
  let rawData = fs.readFileSync('./prisma/countries-states-cities.json', 'utf8');

  let jsonData = JSON.parse(rawData) as any[];

  for (let c of jsonData) {
    let country = await client.country.findFirst({
      where: {
        name: c.name
      }
    });
    console.log('country', country?.name);

    if (!country) {
      country = await client.country.create({
        data: {
          name: c.name,
          iso3: c.iso3,
          iso2: c.iso2,
          phoneCode: c.phone_code,
          currency: c.currency,
          currencyName: c.currency_name,
          currencySymbol: c.currency_symbol,
          region: c.region,
          regionId: c.region_id,
          subRegion: c.subregion,
          subregionId: c.subregion_id,
          nationality: c.nationality,
          timezones: c.timezones,
          active : true
          
        }
      });
      console.log('Created country', country.name);
    }

    for (let s of c.states) {
      let state = await client.state.findFirst({
        where: {
          name: s.name,
          countryId: country.id
        }
      });
      console.log('state', state?.name);
      if (!state) {
        state = await client.state.create({
          data: {
            name: s.name,
            stateCode: s.state_code || '',
            countryId: country.id,
            cities: {
              createMany: {
                data: s.cities.map((cityJson: any) => ({
                  name: cityJson.name,
                  countryId: country!.id,
                  latitude: cityJson.latitude,
                  longitude: cityJson.longitude
                }))
              }
            }
          }
        });
        console.log('Created state', state.name);
      }
    }
  }
};

loadData();
