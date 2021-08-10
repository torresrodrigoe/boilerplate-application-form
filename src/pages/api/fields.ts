import type { NextApiRequest, NextApiResponse } from "next";
import { FieldResponse, FieldTypes } from "../../types/fields";

export default function (_req: NextApiRequest, res: NextApiResponse) {
  const response: FieldResponse = {
    groups: [{
      id: 'primaryContact',
      title: 'Who is the primary contact for this policy?',
      description: 'This person will receive all communications from Newfront about this policy. You can change this contact information later. If you’re not sure, just add your contact information.',
    }, {
      id: 'payment',
      title: 'How do you want to pay for your policy?',
    }],
    fields: [{
      label: 'Full name',
      name: 'name',
      type: FieldTypes.TEXT,
      group: 'primaryContact'
    }, {
      label: 'Role',
      name: 'role',
      type: FieldTypes.TEXT,
      group: 'primaryContact',
    }, {
      label: 'Phone number',
      name: 'phone',
      type: FieldTypes.TEXT,
      group: 'primaryContact',
    }, {
      name: 'paymentType',
      type: FieldTypes.RADIO,
      group: 'payment',
      options: [{
        title: 'I want to pay Newfront',
        description: 'You’ll pay Newfront instead of paying each insurance company separately. There are no fees.',
        isRecommended: true,
        value: 'newfront'
      }, {
        title: 'I want to pay the insurance company directly',
        description: 'You’ll receive bills from the insurance company and it will be your responsibility to make sure they are paid to keep your coverage.',
        isRecommended: false,
        value: 'direct'
      }]
    }]
  };

  res.send(response);
}