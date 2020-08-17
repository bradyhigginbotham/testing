export const availableOrders = [
  {
    id: '749b1ee9',
    status: 'available',
    order_windows: [
      {
        end_time: '2019-10-05T20:00:00.0000000Z',
        type: 'delivery',
        start_time: '2019-10-05T18:00:00.0000000Z',
      },
      {
        end_time: '2019-10-15T20:00:00.0000000Z',
        type: 'pickup',
        start_time: '2019-10-15T18:00:00.0000000Z',
      },
    ],
    num_of_hamprs: 2,
    longitude: -92.0436,
    latitude: 30.17199,
  },
  {
    id: '749b1ee9',
    status: 'available',
    order_windows: [
      {
        end_time: '2019-10-05T20:00:00.0000000Z',
        type: 'delivery',
        start_time: '2019-10-05T18:00:00.0000000Z',
      },
      {
        end_time: '2019-10-04T23:00:00.0000000Z',
        type: 'pickup',
        start_time: '2019-10-15T19:00:00.0000000Z',
      },
    ],
    num_of_hamprs: 1,
    longitude: -92.2436,
    latitude: 30.16199,
  },
  {
    id: '749b1ee9',
    status: 'available',
    order_windows: [
      {
        end_time: '2019-10-05T20:00:00.0000000Z',
        type: 'delivery',
        start_time: '2019-10-05T18:00:00.0000000Z',
      },
      {
        end_time: '2019-10-04T14:00:00.0000000Z',
        type: 'pickup',
        start_time: '2019-10-17T09:00:00.0000000Z',
      },
    ],
    num_of_hamprs: 3,
    longitude: -92.2536,
    latitude: 30.16199,
  },
  {
    id: '749b1ee9',
    status: 'available',
    order_windows: [
      {
        end_time: '2019-10-05T20:00:00.0000000Z',
        type: 'delivery',
        start_time: '2019-10-05T18:00:00.0000000Z',
      },
      {
        end_time: '2019-10-04T16:00:00.0000000Z',
        type: 'pickup',
        start_time: '2019-10-18T12:00:00.0000000Z',
      },
    ],
    num_of_hamprs: 1,
    longitude: -92.3436,
    latitude: 30.16199,
  },
];

export const myDeliveries = [
         {
           id: '749b1ee9',
           status: 'claimed',
           customer: {
             name: 'Jenny Hernandez',
             phone: '413-4132-1233',
           },
           order_windows: [
             {
               end_time: '2019-10-05T20:00:00.0000000Z',
               type: 'delivery',
               start_time: '2019-10-05T18:00:00.0000000Z',
             },
             {
               end_time: '2019-10-15T20:00:00.0000000Z',
               type: 'pickup',
               start_time: '2019-10-15T18:00:00.0000000Z',
             },
           ],
           order_items: [
             {
               id: 'FgUoz5us7pXkkq',
               label: 'Gym Clothes',
               will_provide_fabric_softener: 0,
               will_provide_dryer_sheet: 0,
               will_provide_detergent: 1,
               soil: 'medium',
               drying_temperature: 'regular',
               hampr_scan_text: 'AA00',
               washing_temperature: 'hot',
               drying_special_requests: "dry with someone else's clothes",
               washing_special_requests: 'one piece at a time',
             },
           ],
           pickup_address: {
             city: 'Lafayette',
             street_1: '678 Cajundome Blvd',
             state: 'LA',
             postal_code: '70508',
             longitude: -92.0436,
             latitude: 30.17199,
             instructions:
               "The hampr is on the back patio. The gate is unlocked on the left side of the house. I don't have any pets! Thanks so much.",
           },
           delivery_address: {
             city: 'Lafayette',
             street_1: '678 Cajundome Blvd',
             state: 'LA',
             postal_code: '70508',
             longitude: -92.0436,
             latitude: 30.17199,
             instructions:
               "Leave the hampr on the back patio. The gate is unlocked on the left side of the house. I don't have any pets! Thanks so much.",
           },
         },
         {
           id: '749b1ee9',
           status: 'claimed',
           customer: {
             name: 'Dwight Schrute',
             phone: '413-4132-1233',
           },
           order_windows: [
             {
               end_time: '2019-10-05T20:00:00.0000000Z',
               type: 'delivery',
               start_time: '2019-10-05T18:00:00.0000000Z',
             },
             {
               end_time: '2019-10-04T23:00:00.0000000Z',
               type: 'pickup',
               start_time: '2019-10-15T19:00:00.0000000Z',
             },
           ],
           order_items: [
             {
               id: 'FgUoz5us7pXkkq',
               label: 'Gym Clothes',
               will_provide_fabric_softener: 0,
               will_provide_dryer_sheet: 0,
               will_provide_detergent: 1,
               soil: 'medium',
               drying_temperature: 'regular',
               hampr_scan_text: 'AA00',
               washing_temperature: 'hot',
               drying_special_requests: "dry with someone else's clothes",
               washing_special_requests: 'one piece at a time',
             },
             {
               id: 'FgUoz5us7pXkkq',
               label: 'Work Clothes',
               will_provide_fabric_softener: 0,
               will_provide_dryer_sheet: 0,
               will_provide_detergent: 1,
               soil: 'medium',
               drying_temperature: 'regular',
               hampr_scan_text: 'AA00',
               washing_temperature: 'hot',
               drying_special_requests: "dry with someone else's clothes",
               washing_special_requests: 'one piece at a time',
             },
             {
               id: 'FgUoz5us7pXkkq',
               label: 'Bedsheets',
               will_provide_fabric_softener: 0,
               will_provide_dryer_sheet: 0,
               will_provide_detergent: 1,
               soil: 'medium',
               drying_temperature: 'regular',
               hampr_scan_text: 'AA00',
               washing_temperature: 'hot',
               drying_special_requests: "dry with someone else's clothes",
               washing_special_requests: 'one piece at a time',
             },
           ],
           pickup_address: {
             city: 'Lafayette',
             street_1: '100 Central St',
             line_2: '#12',
             state: 'LA',
             postal_code: '70508',
             longitude: -92.2436,
             latitude: 30.16199,
           },
           delivery_address: {
             city: 'Lafayette',
             street_1: '100 Central St',
             state: 'LA',
             postal_code: '70508',
             longitude: -92.2436,
             latitude: 30.16199,
           },
         },
         {
           id: '749b1ee9',
           status: 'done',
           customer: {
             name: 'Ryan Howard',
             phone: '413-4132-1233',
           },
           order_windows: [
             {
               end_time: '2019-10-05T20:00:00.0000000Z',
               type: 'delivery',
               start_time: '2019-10-05T18:00:00.0000000Z',
             },
             {
               end_time: '2019-10-04T14:00:00.0000000Z',
               type: 'pickup',
               start_time: '2019-10-17T09:00:00.0000000Z',
             },
           ],
           order_items: [
             {
               id: 'FgUoz5us7pXkkq',
               label: 'Suit',
               will_provide_fabric_softener: 0,
               will_provide_dryer_sheet: 0,
               will_provide_detergent: 1,
               soil: 'medium',
               drying_temperature: 'regular',
               hampr_scan_text: 'AA00',
               washing_temperature: 'hot',
               drying_special_requests: "dry with someone else's clothes",
               washing_special_requests: 'one piece at a time',
             },
             {
               id: 'FgUoz5us7pXkkq',
               label: 'Gym Clothes',
               will_provide_fabric_softener: 0,
               will_provide_dryer_sheet: 0,
               will_provide_detergent: 1,
               soil: 'medium',
               drying_temperature: 'regular',
               hampr_scan_text: 'AA00',
               washing_temperature: 'hot',
               drying_special_requests: "dry with someone else's clothes",
               washing_special_requests: 'one piece at a time',
             },
           ],
           pickup_address: {
             city: 'Lafayette',
             street_1: '2312 Kaliste Saloom Rd',
             state: 'LA',
             postal_code: '70508',
             longitude: -92.2536,
             latitude: 30.16199,
           },
           delivery_address: {
             city: 'Lafayette',
             street_1: '2312 Kaliste Saloom Rd',
             state: 'LA',
             postal_code: '70508',
             longitude: -92.2536,
             latitude: 30.16199,
             instructions:
               "Leave the hampr on the back patio. The gate is unlocked on the left side of the house. I don't have any pets! Thanks so much.",
           },
         },
       ];