import moment from 'moment-timezone';

function windowFromItem(item, type) {
  if (!item) {
    return undefined;
  }

  let window;

  if (item.order_windows && item.order_windows.length) {
    const windows = item.order_windows.filter(ow => ow.type.toLowerCase() === type.toLowerCase());

    if (!windows.length) {
      return undefined;
    }

    window = windows[0];
  } else {
    window = {
      type,
      start_time: item[`${type  }_start_time`],
      end_time: item[`${type  }_end_time`],
    };
  }

  return window;
}

export function formattedDeliveryDay(item) {
  const deliveryWindow = windowFromItem(item, `delivery`);

  if (!deliveryWindow) {
    return `Delivery Today (no window)`;
  }

  const deliveryTimeStart = moment(
    deliveryWindow.start_time,
    `YYYY-MM-DThh:mm:ssAZ`,
  );
  const options = {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'MM/DD/YYYY',
  };
  return deliveryTimeStart.calendar(null, options);
}

export function formattedPickupDay(item) {
  const pickupWindow = windowFromItem(item, `pickup`);

  if (!pickupWindow) {
    return `Pickup Today (no window)`;
  }

  const pickupTimeStart = moment(
    pickupWindow.start_time,
    `YYYY-MM-DThh:mm:ssAZ`,
  );
  const options = {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'MM/DD/YYYY',
  };
  return pickupTimeStart.calendar(null, options);
}

export function formattedDeliveryWindow(item) {
  const deliveryWindow = windowFromItem(item, `delivery`);

  if (!deliveryWindow) {
    return `No Delivery Window Available`;
  }

  const deliveryTimeStart = moment(
    deliveryWindow.start_time,
    `YYYY-MM-DThh:mm:ssAZ`,
  );
  const deliveryTimeEnd = moment(
    deliveryWindow.end_time,
    `YYYY-MM-DThh:mm:ssAZ`,
  );

  return `${deliveryTimeStart.format('h:mm A')  } - ${  deliveryTimeEnd.format('h:mm A')}`;
}

export function formattedPickupWindow(item) {
  const pickupWindow = windowFromItem(item, `pickup`);

  if (!pickupWindow) {
    return `No Pickup Window Available`;
  }

  const pickupTimeStart = moment(
    pickupWindow.start_time,
    `YYYY-MM-DThh:mm:ssAZ`,
  );
  const pickupTimeEnd = moment(
    pickupWindow.end_time, 
    `YYYY-MM-DThh:mm:ssAZZ`
  );

  return `${pickupTimeStart.format('h:mm A')  } - ${  pickupTimeEnd.format('h:mm A')}`;
}

export function formattedHamprCount(item) {
  if (!item || !item.num_of_hamprs) {
    return `0 hamprs`;
  }

  return `${item.num_of_hamprs  } hampr${  item.num_of_hamprs == 1 ? `` : `s`}`;
}

function distanceToUser(item, userLocation) {
  let dist = 0;
  if (userLocation) {
    const radlat1 = (Math.PI * item.latitude) / 180;
    const radlat2 = (Math.PI * userLocation.latitude) / 180;
    const theta = item.longitude - userLocation.longitude;
    const radtheta = (Math.PI * theta) / 180;
    dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    if (dist > 1) {
      dist = 1;
    }

    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
  }

  return dist;
}

export function formattedDistanceToUser(item, userLocation, shortFormat = false) {
  return `${distanceToUser(item, userLocation).toFixed(1)  } mi.${  shortFormat ? `` : ` away`}`;
}

export function formattedAddress(address, useTwoLines) {
  const line1 = [];
  const line2 = [];

  if (address.street_1) {
    line1.push(address.street_1);
  }

  if (address.street_2) {
    line1.push(address.street_2);
  }

  if (address.city) {
    line2.push(address.city);
  }

  if (address.state) {
    line2.push(address.state);
  }

  const lines = [line1.join(`, `), line2.join(` `)];
  let formatted = lines.join(useTwoLines ? `\n` : `, `);

  if (address.postal_code) {
    formatted += `, ${  address.postal_code}`;
  }

  return formatted;
}

export function customerFirstName(order) {
  const components = order.customer.name.split(` `);
  return components[0];
}
