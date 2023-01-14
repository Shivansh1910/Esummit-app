import create, { StateCreator } from 'zustand';

interface IProfileStates {
  image: string | null;
  name: string;
  email: string;
  pass: string;
  qrcode: string;
  isSignedIn: boolean;
  isAdmin: boolean;
}

interface IProfileMethods {
  setProfile: (profile: Partial<IProfileStates>) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPass: (pass: string) => void;
  setQRCode: (qrcode: string) => void;
  setIsSignedIn: (isSignedIn: boolean) => void;
  setIsAdmin : (isAdmin : boolean) => void;
  reset: () => void;
}

interface IProfileStore extends IProfileStates, IProfileMethods {}

const store: StateCreator<IProfileStore> = set => ({
  image: 'https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png',
  name: '',
  email: '',
  pass: '',
  qrcode: '',
  isSignedIn: true,
  isAdmin: false,
  setProfile: (profile: Partial<IProfileStates>) => set(profile),
  setName: (name: string) => set({ name }),
  setEmail: (email: string) => set({ email }),
  setPass: (pass: string) => set({ pass }),
  setQRCode: (qrcode: string) => set({ qrcode }),
  setIsAdmin : (isAdmin : boolean) => set({ isAdmin }),
  reset: () =>
    set({
      image: null,
      name: '',
      email: '',
      qrcode: '',
      pass: '',
      isAdmin: false,
    }),
  setIsSignedIn: (isSignedIn: boolean) => set({ isSignedIn }),
});

export const useProfileStore = create<IProfileStore>(store);
