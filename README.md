# Job Manager app (version 3) for the EBRAINS Neuromorphic Computing Service

Available online at https://job-manager.hbpneuromorphic.eu and as an app in the EBRAINS Collaboratory.

This project was bootstrapped with Vite.

## Available Scripts

To run the development server:

### `npm run dev`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

## Acknowledgments

The current version of the application was developed as part of the EBRAINS research infrastructure,
funded from the European Union’s Horizon Europe Framework Programme for Research and Innovation
under Specific Grant Agreement No. xyzxyz (EBRAINS 2.0).

Previous versions were developed in the Human Brain Project,
funded from the European Union’s Horizon 2020 Framework Programme for Research and Innovation
under Specific Grant Agreements No. 720270, No. 785907 and No. 945539
(Human Brain Project SGA1, SGA2 and SGA3).

## Dev notes

- This reimplementation is based on React Router v6.
- The goals are:
  - more consistent behaviour when navigating between internal pages
  - replace OIDC Implicit flow with Authorization Code flow
  - upgrade MUI to v5
