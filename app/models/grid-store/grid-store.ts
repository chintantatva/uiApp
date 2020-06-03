import { Instance, SnapshotOut, types, getParent } from "mobx-state-tree"
import { flow } from "mobx";
import { Api } from "../../services/api";
const Realm = require('realm');





/**
 * A RootStore model.
 */
// prettier-ignore

export const gridListApiParamsModal = types.model("gridListApiParamsModal").props({
    limit: 10,
    offset: 0
}).actions(self => ({

}))

const imageSchema = {
    name: 'Images',
    properties: {
        // The following property definitions are equivalent
        image: { type: 'string' },
        name: { type: 'string' },
        primaryKey: 'name'
    }
}


const api = new Api();
api.setup()
export const GridStoreModel = types.model("GridStore").props({
    gridList: types.array(types.frozen()),
    gridListApiParams: types.optional(gridListApiParamsModal, {})
}).actions(self => ({
    fetchUser: flow(function* fetchUser() {
        const userList = yield api.getGridList(self.gridListApiParams)
        if (userList.kind == 'ok') {
            getParent(self).gridStore.setDataInRelam(userList)
            getParent(self).gridStore.updateGridList(userList.users.data.users)
        }
    }),
    setDataInRelam(userList) {
        Realm.open({
            schema: [{ name: 'Users', properties: { name: 'string', image: 'string' }, primaryKey: 'name', }, imageSchema]
        }).then(realm => {
            realm.write(() => {
                userList.users.data.users.forEach(obj => {
                    obj.items.forEach(item => {
                        realm.create('Images', {
                            name: obj.name,
                            image: obj.image
                        });
                    })
                    realm.create('Users', {
                        name: obj.name,
                        image: obj.image
                    });
                });
            });
        })
    },
    fetchUserNewPage: flow(function* fetchUserNewPage() {
        const userList = yield api.getGridList({ offset: self.gridList.length, limit: 10 })
        if (userList.kind == 'ok') {
            getParent(self).gridStore.setDataInRelam(userList)
            getParent(self).gridStore.appendGridList(userList.users.data.users)
        }
    }),
    updateGridList(value) {
        self.gridList = value
    },
    appendGridList(value) {
        let gridList = JSON.parse(JSON.stringify(self.gridList))
        gridList = gridList.concat(value);
        self.gridList = JSON.parse(JSON.stringify(gridList))
    },
}))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof GridStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface NewsStoreSnapshot extends SnapshotOut<typeof GridStoreModel> { }
